import { categories } from '../prisma/data/categories.js'
import { products } from '../prisma/data/products.js'
import prisma from '../src/config/db.js'

async function main(){
    console.log('Running seeding...')

    for ( const category of categories ){
        await prisma.category.upsert({
            where : { id : category.id },
            update : {},
            create : category
        })
    }

    for ( const product of products){
        await prisma.product.create({
            data : product
        })
    }

    console.log('Seeding done')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async => {
        prisma.$disconnect()
    })