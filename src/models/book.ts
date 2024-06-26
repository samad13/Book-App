import mongoose from 'mongoose';
//import mongoose, { Document } from 'mongoose'; fic this first, thrn fix controller no matter what
//import { Document, Schema, model, Types } from 'mongoose';
export interface Review {
    name: string;
    rating: number;
    user: mongoose.Schema.Types.ObjectId | string;
}

export interface BookDocument extends Document {
    createdBy: mongoose.Schema.Types.ObjectId | string;
    name: string;
    image: string;
    description: string;
    reviews: Review[];
    numReviews: number;
    price: number;
    rating: number;
    countInStock: number;
    genre: 'romance' | 'sci-fi' | 'comedy' | 'horror' | 'biography';
}

const reviewSchema = new mongoose.Schema<Review>(
    {
        name: { type: String, required: true },
        rating: { type: Number, required: true },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
    },
    {
        timestamps: true,
    }
);

const bookSchema = new mongoose.Schema<BookDocument>({
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    name: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    reviews: [reviewSchema],
    numReviews: {
        type: Number,
        required: true,
        default: 0,
    },
    price: {
        type: Number,
        required: true,
        default: 0,
    },
    rating: {
        type: Number,
        default: 0,
    },
    countInStock: {
        type: Number,
        required: true,
        default: 0,
    },
    genre: {
        type: String,
        required: true,
        enum: ['romance', 'sci-fi', 'comedy', 'horror', 'biography'],
    },
},
    {
        timestamps: true,
    });

const Book = mongoose.model<BookDocument>('Book', bookSchema);

export default Book;



// import { Document, Schema, model, Types } from 'mongoose';

// // Define the interface for the category schema
// interface ICategory extends Document {
//   name: string;
// }

// // Define the interface for the menu item schema
// interface IMenuItem extends Document {
//   name: string;
//   category: Types.ObjectId;
//   description: string;
//   price: number;
//   image_url: string;
//   createdAt: Date;
//   categoryName: string; // Add a categoryName field for the virtual property
// }

// // Define the category schema
// const categorySchema = new Schema<ICategory>({
//   name: {
//     type: String,
//     required: true,
//   },
// });

// // Define the virtual property for categoryName
// categorySchema.virtual('categoryName').get(function (this: ICategory) {
//   return this.name;
// });

// // Define the menu item schema
// const menuItemSchema = new Schema<IMenuItem>({
//   name: {
//     type: String,
//     required: true,
//   },
//   category: {
//     type: Schema.Types.ObjectId,
//     required: true,
//     ref: 'Category',
//   },
//   description: {
//     type: String,
//     required: [true, 'Please provide item description'],
//   },
//   price: {
//     type: Number,
//     required: [true, 'Please provide price'],
//   },
//   image_url: {
//     type: String,
//     required: [true, 'Please upload an image'],
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// // Define the MenuItem model
// const MenuItem = model<IMenuItem>('MenuItem', menuItemSchema);

// export default MenuItem;
