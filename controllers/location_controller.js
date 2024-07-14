const model = require('../models');
const fs = require('fs');
const csv = require('csv-parser');

// http://192.168.31.240:7000/api/location/updateCountries
// http://192.168.31.240:7000/api/location/updateStates
// http://192.168.31.240:7000/api/location/updateCities

const updateCountries = async (req, res) => {
    try {
        // Sync the model with the database schema (create the table if it doesn't exist)
        await model.CountryMaster.sync();

        const results = [];

        fs.createReadStream('countries.csv')
            .pipe(csv())
            .on('data', (row) => {
                results.push(row);
            })
            .on('end', async () => {
                const transaction = await model.sequelize.transaction();
                try {
                    // Update all rows in the database table
                    for (const row of results) {
                        await model.CountryMaster.create(
                            {
                                country_id: row.id,
                                country_name: row.name,
                                phone_code: row.phone_code
                            },
                            { transaction }
                        );
                    }

                    await transaction.commit();
                    return res.status(200).json({ message: "Updated successfully." });
                } catch (error) {
                    await transaction.rollback();
                    console.error('Error during database operation:', error);
                    return res.status(500).json({ message: "Error updating" });
                }
            })
            .on('error', (error) => {
                console.error('Error reading CSV file:', error);
                return res.status(500).json({ message: "Error reading CSV file" });
            });

    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: "Error updating" });
    }
};

const updateStates = async (req, res) => {
    try {
        // Sync the model with the database schema (create the table if it doesn't exist)
        await model.StateMaster.sync();

        const results = [];

        fs.createReadStream('states.csv')
            .pipe(csv())
            .on('data', (row) => {
                results.push(row);
            })
            .on('end', async () => {
                const transaction = await model.sequelize.transaction();
                try {
                    // Update all rows in the database table
                    for (const row of results) {
                        await model.StateMaster.create(
                            {
                                state_id: row.id,
                                state_name: row.name,
                                country_id:row.country_id,
                                country_code:row.country_code,
                                country_name:row.country_name,
                                state_code:row.state_code
                            },
                            { transaction }
                        );
                    }

                    await transaction.commit();
                    return res.status(200).json({ message: "Updated successfully." });
                } catch (error) {
                    await transaction.rollback();
                    console.error('Error during database operation:', error);
                    return res.status(500).json({ message: "Error updating" });
                }
            })
            .on('error', (error) => {
                console.error('Error reading CSV file:', error);
                return res.status(500).json({ message: "Error reading CSV file" });
            });

    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: "Error updating" });
    }
};

const updateCities = async (req, res) => {
    try {
        // Sync the model with the database schema (create the table if it doesn't exist)
        await model.CityMaster.sync();

        const results = [];

        fs.createReadStream('cities.csv')
            .pipe(csv())
            .on('data', (row) => {
                results.push(row);
            })
            .on('end', async () => {
                const transaction = await model.sequelize.transaction();
                try {
                    // Update all rows in the database table
                    for (const row of results) {
                        await model.CityMaster.create(
                            {
                                city_id: row.id,
                                city_name: row.name,
                                state_id: row.state_id,
                                state_code: row.state_code,
                                state_name: row.state_name,
                                country_id: row.country_id,
                                country_code: row.country_code,
                                country_name: row.country_name
                            },
                            { transaction }
                        );
                    }

                    await transaction.commit();
                    return res.status(200).json({ message: "Updated successfully." });
                } catch (error) {
                    await transaction.rollback();
                    console.error('Error during database operation:', error);
                    return res.status(500).json({ message: "Error updating" });
                }
            })
            .on('error', (error) => {
                console.error('Error reading CSV file:', error);
                return res.status(500).json({ message: "Error reading CSV file" });
            });

    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: "Error updating" });
    }
};

const getAllCountries = async (req, res) => {
    try {
        await model.CountryMaster.findAll().then((result) => {
            return res.status(200).json(result);
        }).catch((err) => {
            return res.status(500).json({ message: "Not Able to Get Countries" });
        });

      
    } catch (error) {
        return res.status(500).json({ message: "Not Able to Get Countries" });
    }
};

const getAllStates = async (req, res) => {
    try {
        const data = {
            country_id:req.body.country_id
        };
       await model.StateMaster.findAll({where:{country_id:data["country_id"]}}).then((result) => {
        return res.status(200).json(result);
       }).catch((err) => {
        return res.status(500).json({ message: "Not Able to Get States" });
       });
    } catch (error) {
        return res.status(500).json({ message: "Not Able to Get States" });
    }
}

const getAllCities = async (req, res) => {
    try {
        const data = {
            state_id:req.body.state_id
        };
       await model.CityMaster.findAll({where:{state_id:data["state_id"]}}).then((result) => {
        return res.status(200).json(result);
       }).catch((err) => {
        return res.status(500).json({ message: "Not Able to Get Cities" });
       });
    } catch (error) {
        return res.status(500).json({ message: "Not Able to Get Cities" });
    }
}


module.exports = {
    updateCountries: updateCountries,
    updateStates:updateStates,
    updateCities:updateCities,
    getAllCountries:getAllCountries,
    getAllStates:getAllStates,
    getAllCities:getAllCities
};
