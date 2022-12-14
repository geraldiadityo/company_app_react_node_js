exports.allAccess = (req, res) => {
    res.status(200).send({
        message:"public content"
    });
};

exports.userBoard = (req, res) => {
    res.status(200).send({
        message:"user content"
    });
};

exports.adminBoard = (req, res) => {
    res.status(200).send({
        message:"Admin Content"
    });
};