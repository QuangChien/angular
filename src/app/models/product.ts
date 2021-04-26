export class Product {
    id: Number
    title: string
    price: Number
    categoryId: Number
    authorId: Number
    image: string
    author: any[]
    category: any[]
    constructor(id: Number, title: string, price: Number,
        categoryId: Number, authorId: Number, image: string,
        category: any[] =[], author: any[]=[]){
        this.id = id;
        this.title = title;
        this.price = price;
        this.categoryId = categoryId;
        this.authorId = authorId;
        this.image = image;
        this.category = category;
        this.author = author

    }
}
