import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    authentication: {
        pasword: { type: String, required: true, select: false },
        salt: { type: String, select: false },
        sessionToken: { type: String, select: false },
    }
});

export const UserModel = mongoose.model('User', UserSchema)

export const getUsers = () => UserModel.find();
export const getUsersByEmail = (email: string) => UserModel.findOne({ email })
export const getUsersBySessionToken = (sessionToken: string) => UserModel.findOne({
    'authentication.sessionToken': sessionToken
});

export const getUsersById = (id: string) => UserModel.findById(id);
export const createdUser = (values: Record<string, any>) => new UserModel(values)
    .save().then((user) => user.toObject());
export const deleteUserById = (id: string) => UserModel.findOneAndDelete({ _id: id })
export const updateUserById = (id: string, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values);