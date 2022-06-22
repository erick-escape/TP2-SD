import mongoose from '@/database';

const devjobsSchema = new mongoose.Schema({
    cpf: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    cellPhone: {
        type: String,
    },
    birthDate: {
        type: Date,
    }
});

export default mongoose.model('devs', devjobsSchema);