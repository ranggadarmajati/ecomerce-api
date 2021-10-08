'use strict'
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
            const product = await Product.findBy('uuid', id)
            const res = await product
                .product_categories()
                .product_colors()
                .product_sizes()
                .images()
                .product_measures()
                .product_promotions()
                .fetch()
            return response.Wrapper(200, true, 'get product data successfully!', res)
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
            const productImages = []
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
                await Image.createMany(productImages, trx)
                await ProductCategory.createMany(productCategories, trx)
                await ProductSize.createMany(productSizes, trx)
                await ProductColor.createMany(productColors, trx)
                await ProductMeasure.create(productMeasure, trx)
                await trx.commit()
                return response.Wrapper( 201, true, 'create product data successfully!', data )
            } catch (error) {
                await trx.rollback()
                return response.Wrapper( 500, false, 'Failed create product data, please try again later!' )
            }
        }

    }
}

module.exports = ProductController
