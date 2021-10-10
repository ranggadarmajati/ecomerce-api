'use strict'
const fs = require('fs')
const Helpers = use('Helpers')
const Database = use('Database')
const Image = use('App/Models/Image')
const Product = use('App/Models/Product')
const ProductSize = use('App/Models/ProductSize')
const ProductColor = use('App/Models/ProductColor')
const ProductMeasure = use('App/Models/ProductMeasure')
const ProductCategory = use('App/Models/ProductCategory')
const ModelRepository = use('App/Repository/Model')
class ProductController {
    async index({ response }) {
        const product = new ModelRepository(Product)
        let data = await product.showAll()
        return response.Wrapper(200, true, 'get product data successfully!', data)
    }

    async getByQuery({ response, request }) {
        const product = new ModelRepository(Product)
        let data = await product.showQuery(request)
        return response.Wrapper(200, true, 'get product data successfully!', data)
    }

    async show({ response, params }) {
        const { id } = params
        try {
            const product = await Product.query().where('uuid', id)
                .with('product_categories', (builder) => {
                    builder.with('category')
                })
                .with('product_colors', (builder) => {
                    builder.with('color')
                })
                .with('product_sizes')
                .with('images')
                .with('product_measures')
                .with('product_promotions')
                .fetch()
            return response.Wrapper(200, true, 'get product data successfully!', product)
        } catch (error) {
            console.log(error.message)
            return response.Wrapper(404, false, 'product not found!')
        }
    }

    async store({ response, request }) {
        const product = new ModelRepository(Product)
        const mainBody = request.only(['name', 'description', 'sku', 'brand', 'gender', 'capital_price', 'selling_price', 'stock', 'point', 'label'])
        const data = await product.create(mainBody)
        if (!data) {
            return response.Wrapper(500, false, 'failed create product data, please try again later!')
        } else {
            const { product_sizes, product_colors, product_categories } = request.all()
            const productImages = []
            if (request.file('product_images')) {
                // upload images
                const productPics = request.file('product_images', {
                    types: ['image'],
                    size: '5mb',
                    extnames: ['png', 'jpg', 'jpeg']
                })
                const path = 'uploads/images/product'
                await productPics.moveAll(Helpers.publicPath(`${path}`), (file) => {
                    return {
                        name: `${new Date().getTime()}.${file.subtype}`
                    }
                })
                const removeFile = Helpers.promisify(fs.unlink)
                if (!productPics.movedAll()) {
                    const movedFiles = productPics.movedList()
                    await Promise.all(movedFiles.map((file) => {
                        return removeFile(path.join(file._location, file.fileName))
                    }))
                    return productPics.errors()
                }
                const images = productPics.movedList()
                for (const img of images) {
                    productImages.push(
                        {
                            product_id: data.id,
                            file_name: img.fileName,
                            path: path,
                            image_uri: `${request.protocol()}://${request.header('host')}/${path}/${img.fileName}`
                        }
                    )
                }

                // end upload images
            }
            const productSizes = []
            for (const size of product_sizes) {
                productSizes.push(
                    {
                        product_id: data.id,
                        name: size.name,
                        additional_price: size.additional_price,
                        additional_capital_price: size.additional_capital_price
                    }
                )
            }
            const productColors = []
            for (const color of product_colors) {
                productColors.push(
                    {
                        product_id: data.id,
                        color_id: color.color_id,
                        additional_price: color.additional_price,
                        additional_capital_price: color.additional_capital_price
                    }
                )
            }
            const productCategories = []
            for (const category of product_categories) {
                productCategories.push(
                    {
                        product_id: data.id,
                        category_id: category.category_id
                    }
                )
            }
            const productMeasure = request.only(['weight', 'length', 'width'])
            productMeasure.product_id = data.id
            const trx = await Database.beginTransaction()
            try {
                if (productImages.length > 0) await Image.createMany(productImages, trx)
                await ProductCategory.createMany(productCategories, trx)
                await ProductSize.createMany(productSizes, trx)
                await ProductColor.createMany(productColors, trx)
                await ProductMeasure.create(productMeasure, trx)
                await trx.commit()
                return response.Wrapper(201, true, 'create product data successfully!', data)
            } catch (error) {
                console.log(error.message)
                await trx.rollback()
                return response.Wrapper(500, false, 'Failed create product data, please try again later!')
            }
        }

    }

    async uploadImage({ response, request, params }) {
        let { id } = params
        const product = new ModelRepository(Product)
        const data = await product.showBy('uuid', id)
        if (!data) {
            return response.Wrapper(
                404,
                false,
                "Product not found!"
            )
        }

        const productPics = request.file('product_image', {
            types: ['image'],
            size: '5mb',
            extnames: ['png', 'jpg', 'jpeg']
        })
        const extension = productPics.extname
        const filename = `${data.slug}-${new Date().getTime()}.${extension}`
        const path = 'uploads/images/product'
        await productPics.move(Helpers.publicPath(`${path}`), {
            name: filename,
            overwrite: true
        })
        if (!productPics.moved()) {
            return productPics.errors()
        }

        try {
            const images = await new ModelRepository(Image)
            const obj = {
                product_id: data.id,
                file_name: filename,
                path: path,
                image_uri: `${request.protocol()}://${request.header('host')}/${path}/${filename}`
            }
            const store = await images.create(obj)
            if (!store) {
                return response.Wrapper(500, false, 'Failed Upload Product Image, please try again later!')
            }
            return response.Wrapper(201, true, 'Upload Product Image Successfully!', store)
        } catch (error) {
            return response.Wrapper(500, false, 'Something went wrong, please try again later!')
        }

    }

    async deleteImage({ response, params }) {
        const { id, product_id } = params
        let image = new ModelRepository(Image)
        const removeFile = Helpers.promisify(fs.unlink)
        const data = await image.showBy('uuid', id)
        if (!data) {
            return response.Wrapper(404, false, 'Image not found!')
        }
        try {
            const deleted = await image.deleteBy('uuid', id)
            if (!deleted) {
                return response.Wrapper(500, false, 'Failed delete product image, please try again later!')
            }
            await removeFile(Helpers.publicPath(`${data.path}/${data.file_name}`))
            const product = await Product.query().where('uuid', product_id)
                .with('product_categories', (builder) => {
                    builder.with('category')
                })
                .with('product_colors', (builder) => {
                    builder.with('color')
                })
                .with('product_sizes')
                .with('images')
                .with('product_measures')
                .with('product_promotions')
                .fetch()
            return response.Wrapper(200, true, 'Delete product image successfully!', product)
        } catch (error) {
            console.log("error delete product image", error.message)
            return response.Wrapper(500, false, 'Something went wrong, please try again later!')
        }
    }

    async deleteCategory({ response, params }) {
        const { id, product_id } = params
        let product_category = new ModelRepository(ProductCategory)
        const deleted = await product_category.deleteBy('uuid', id)
        if (!deleted) {
            return response.Wrapper(500, false, 'Failed delete category product, please try again later!')
        }
        const product = await Product.query().where('uuid', product_id)
            .with('product_categories', (builder) => {
                builder.with('category')
            })
            .with('product_colors', (builder) => {
                builder.with('color')
            })
            .with('product_sizes')
            .with('images')
            .with('product_measures')
            .with('product_promotions')
            .fetch()
        return response.Wrapper(200, true, 'Delete product category successfully!', product)
    }

    async addCategory({ response, params, request }) {
        const { product_id } = params
        const { category_id } = request.all()
        let product_model = new ModelRepository(Product)
        const product_data = await product_model.showBy('uuid', product_id)
        if(!product_data) return response.Wrapper(404, false, 'Product data not found!')
        let product_category = new ModelRepository(ProductCategory)
        const obj = {
            product_id: product_data.id,
            category_id: category_id
        }
        
        let store = await product_category.create(obj)
        if (!store) return response.Wrapper(500, false, 'Failed add Category product, please try again later!')
        
        const product = await Product.query().where('uuid', product_id)
            .with('product_categories', (builder) => {
                builder.with('category')
            })
            .with('product_colors', (builder) => {
                builder.with('color')
            })
            .with('product_sizes')
            .with('images')
            .with('product_measures')
            .with('product_promotions')
            .fetch()
        return response.Wrapper(201, true, 'Add category product successfully!', product)
    }

    async deleteColor({ response, params }) {
        const { id, product_id } = params
        let product_color = new ModelRepository(ProductColor)
        const deleted = await product_color.deleteBy('uuid', id)
        if (!deleted) {
            return response.Wrapper(500, false, 'Failed delete product color, please try again later!')
        }
        const product = await Product.query().where('uuid', product_id)
            .with('product_categories', (builder) => {
                builder.with('category')
            })
            .with('product_colors', (builder) => {
                builder.with('color')
            })
            .with('product_sizes')
            .with('images')
            .with('product_measures')
            .with('product_promotions')
            .fetch()
        return response.Wrapper(200, true, 'Delete product color successfully!', product)
    }

    async addColor({ response, params, request }) {
        const { product_id } = params
        const { color_id } = request.all()
        let product_model = new ModelRepository(Product)
        const product_data = await product_model.showBy('uuid', product_id)
        if(!product_data) return response.Wrapper(404, false, 'Product data not found!')
        let product_color = new ModelRepository(ProductColor)
        const obj = {
            product_id: product_data.id,
            color_id: color_id
        }
        
        let store = await product_color.create(obj)
        if (!store) return response.Wrapper(500, false, 'Failed add product color, please try again later!')
        
        const product = await Product.query().where('uuid', product_id)
            .with('product_categories', (builder) => {
                builder.with('category')
            })
            .with('product_colors', (builder) => {
                builder.with('color')
            })
            .with('product_sizes')
            .with('images')
            .with('product_measures')
            .with('product_promotions')
            .fetch()
        return response.Wrapper(201, true, 'Add product color successfully!', product)
    }
}

module.exports = ProductController