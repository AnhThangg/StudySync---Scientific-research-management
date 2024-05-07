const fs = require('fs');

const getProvinces = async (req, res) => {
    try {
        let url = __dirname.slice(0, -11);
        fs.readFile(`${url}data/Provinces.json`, 'utf8', (err, data) => {
            if (err) {
                return res.status(500).json(err);
            }

            try {
                const jsonData = JSON.parse(data);
                return res.status(200).json(jsonData.data.data);
            } catch (parseError) {
                return res.status(500).json(parseError);
            }
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json(e.errors)
    }
}

const getDistricts = async (req, res) => {
    try {
        const {id} = req.params;
        let url = __dirname.slice(0, -11);
        fs.readFile(`${url}data/Districts.json`, 'utf8', (err, data) => {
            if (err) {
                return res.status(500).json(err);
            }
            try {
                const jsonData = JSON.parse(data);
                const list = jsonData.data.data.filter((item) => {
                    if(item.parent_code === id) {
                        return item;
                    }
                })

                return res.status(200).json(list);
            } catch (parseError) {
                return res.status(500).json(parseError);
            }
        });
    } catch (e) {
        return res.status(500).json(e.errors)
    }
}

const getWards = async (req, res) => {
    try {
        const {id} = req.params;
        let url = __dirname.slice(0, -11);
        fs.readFile(`${url}data/Wards.json`, 'utf8', (err, data) => {
            if (err) {
                return res.status(500).json(err);
            }
            try {
                const jsonData = JSON.parse(data);
                const list = jsonData.data.data.filter((item) => {
                    if(item.parent_code === id) {
                        return item;
                    }
                })

                return res.status(200).json(list);
            } catch (parseError) {
                return res.status(500).json(parseError);
            }
        });
    } catch (e) {
        return res.status(500).json(e.errors)
    }
}

module.exports = {
    getProvinces,
    getDistricts,
    getWards
}