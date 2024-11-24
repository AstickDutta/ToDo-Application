
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    if (err.name === 'ValidationError') {
        return res.status(400).json({ status: false, message: err.message });
    }

    if (err.name === 'CastError') {
        return res.status(400).json({ status: false, message: 'Invalid ID format' });
    }

    if (err.code === 11000) {
        const field = Object.keys(err.keyValue)[0];
        return res.status(400).json({
            status: false,
            message: `${field} already exists`,
        });
    }

    res.status(err.status || 500).json({
        status: false,
        message: err.message || 'Something went wrong',
    });
};

const notFound = (req, res, next) => {
    res.status(404).json({ status: false, message: 'Endpoint not found' });
};

module.exports = {
    errorHandler,
    notFound,
};
