const moongose = require('mongoose');
const url = 'mongodb+srv://Sudent:Zut1234!@cluster0.9ajjs.mongodb.net/mobileZUT?retryWrites=true&w=majority'; 

moongose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false 
});