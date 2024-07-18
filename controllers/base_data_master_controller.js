const model = require('../models');
const fs = require('fs');
const csv = require('csv-parser');

// http://192.168.31.240:7000/api/base_data/updateTamilMonth
// http://192.168.31.240:7000/api/base_data/updateTamilStar
// http://192.168.31.240:7000/api/base_data/updatePaksham
// http://192.168.31.240:7000/api/base_data/updateAyanam
// http://192.168.31.240:7000/api/base_data/updateThidhi

const updateTamilMonth = async (req, res) => {
    try {
        // Sync the model with the database schema (create the table if it doesn't exist)
        await model.TamilMonthMaster.sync();

        const results = [];

        fs.createReadStream('Tamil_Month.csv')
            .pipe(csv())
            .on('data', (row) => {
                results.push(row);
            })
            .on('end', async () => {
                const transaction = await model.sequelize.transaction();
                try {
                    // Update all rows in the database table
                    for (const row of results) {
                        await model.TamilMonthMaster.create(
                            {
                                tamil_month_name: row.Thamiz_Month,
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

const updateTamilStar = async (req, res) => {
    try {
        // Sync the model with the database schema (create the table if it doesn't exist)
        await model.TamilStarMaster.sync();

        const results = [];

        fs.createReadStream('Tamil_Stars.csv')
            .pipe(csv())
            .on('data', (row) => {
                results.push(row);
            })
            .on('end', async () => {
                const transaction = await model.sequelize.transaction();
                try {
                    // Update all rows in the database table
                    for (const row of results) {
                        await model.TamilStarMaster.create(
                            {
                                tamil_star_name: row.Thamiz_Stars,
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

const updatePaksham = async (req, res) => {
    try {
        // Sync the model with the database schema (create the table if it doesn't exist)
        await model.PakshamMaster.sync();

        const results = [];

        fs.createReadStream('Paksham.csv')
            .pipe(csv())
            .on('data', (row) => {
                results.push(row);
            })
            .on('end', async () => {
                const transaction = await model.sequelize.transaction();
                try {
                    // Update all rows in the database table
                    for (const row of results) {
                        await model.PakshamMaster.create(
                            {
                                paksham_name: row.Paksham,
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

const updateAyanam = async (req, res) => {
    try {
        // Sync the model with the database schema (create the table if it doesn't exist)
        await model.AyanamMaster.sync();

        const results = [];

        fs.createReadStream('Ayanam.csv')
            .pipe(csv())
            .on('data', (row) => {
                results.push(row);
            })
            .on('end', async () => {
                const transaction = await model.sequelize.transaction();
                try {
                    // Update all rows in the database table
                    for (const row of results) {
                        await model.AyanamMaster.create(
                            {
                                ayanam_name: row.Ayanam,
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

const updateThidhi = async (req, res) => {
    try {
        // Sync the model with the database schema (create the table if it doesn't exist)
        await model.ThidhiMaster.sync();

        const results = [];

        fs.createReadStream('Thidhi.csv')
            .pipe(csv())
            .on('data', (row) => {
                results.push(row);
            })
            .on('end', async () => {
                const transaction = await model.sequelize.transaction();
                try {
                    // Update all rows in the database table
                    for (const row of results) {
                        await model.ThidhiMaster.create(
                            {
                                thidhi_name: row.Thidhi,
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

getAllTamilMonth = async (req, res) => {
    try {
        await model.TamilMonthMaster.findAll().then((result) => {
            if (result.length > 0) {
                return res.status(200).json(result);
            } else {
                return res.status(500).json({ message: "No Data Found." });
            }
        }).catch((err) => {
            return res.status(500).json({ message: "Error", error: err });
        });
    } catch (error) {
        return res.status(500).json({ message: "Something Went Wrong, Please try again later.", error: error });
    }
};

getAllTamilStar = async (req, res) => {
    try {
        await model.TamilStarMaster.findAll().then((result) => {
            if (result.length > 0) {
                return res.status(200).json(result);
            } else {
                return res.status(500).json({ message: "No Data Found." });
            }
        }).catch((err) => {
            return res.status(500).json({ message: "Error", error: err });
        });
    } catch (error) {
        return res.status(500).json({ message: "Something Went Wrong, Please try again later.", error: error });
    }
};

getAllAyanam = async (req, res) => {
    try {
        await model.AyanamMaster.findAll().then((result) => {
            if (result.length > 0) {
                return res.status(200).json(result);
            } else {
                return res.status(500).json({ message: "No Data Found." });
            }
        }).catch((err) => {
            return res.status(500).json({ message: "Error", error: err });
        });
    } catch (error) {
        return res.status(500).json({ message: "Something Went Wrong, Please try again later.", error: error });
    }
};

getAllPaksham = async (req, res) => {
    try {
        await model.PakshamMaster.findAll().then((result) => {
            if (result.length > 0) {
                return res.status(200).json(result);
            } else {
                return res.status(500).json({ message: "No Data Found." });
            }
        }).catch((err) => {
            return res.status(500).json({ message: "Error", error: err });
        });
    } catch (error) {
        return res.status(500).json({ message: "Something Went Wrong, Please try again later.", error: error });
    }
};

getAllThidhi = async (req, res) => {
    try {
        await model.ThidhiMaster.findAll().then((result) => {
            if (result.length > 0) {
                return res.status(200).json(result);
            } else {
                return res.status(500).json({ message: "No Data Found." });
            }
        }).catch((err) => {
            return res.status(500).json({ message: "Error", error: err });
        });
    } catch (error) {
        return res.status(500).json({ message: "Something Went Wrong, Please try again later.", error: error });
    }
};

// =================================================================================================================================

// const updateAzagiyasingar = async (req, res) => {
//     try {
//         // Sync the model with the database schema (create the table if it doesn't exist)
//         await model.AzagiyasingarMaster.sync();

//         const results = [];

//         fs.createReadStream('Azvar.csv')
//             .pipe(csv())
//             .on('data', (row) => {
//                 results.push(row);
//             })
//             .on('end', async () => {
//                 const transaction = await model.sequelize.transaction();
//                 try {
//                     // Update all rows in the database table
//                     for (const row of results) {
//                         await model.AzagiyasingarMaster.create(
//                             {
//                                 // tamil_month_name: row.Thamiz_Month,
//                                 pattam_no: row.Pattam_No,
//                                 name: row.Pattam_Name,
//                                 dob_tamil_month: row.DOB_Thamiz_Month_Name,
//                                 dob_tamil_star: row.DOB_Thamiz_Stars_name,
//                                 dob_english_date: "",
//                                 pattam_alive: row.Pattam_Alive(Y/N)===N?false:true,
//                                 thirunakshatram: row.Pattam_Thirynakshatram===N?false:true,
//                                 kainkaryam: row.Pattam_Kainkaryam===N?false:true,
//                                 dod_tamil_month: row.DOD_Remem_Thamiz_Month,
//                                 dod_english_date: "",
//                                 dod_paksham: row.DOD_Remem_Paksham,
//                                 dod_thidhi: row.DOD_Remem_Thamiz_Thidhi,
//                                 brindavan_location: row.Pattam_Brindavan_location,
//                                 is_active: true,
//                                 thirunakshatram_price:"",
//                                 kainkaryam_price:""
//                             },
//                             { transaction }
//                         );
//                     }

//                     await transaction.commit();
//                     return res.status(200).json({ message: "Updated successfully." });
//                 } catch (error) {
//                     await transaction.rollback();
//                     console.error('Error during database operation:', error);
//                     return res.status(500).json({ message: "Error updating" });
//                 }
//             })
//             .on('error', (error) => {
//                 console.error('Error reading CSV file:', error);
//                 return res.status(500).json({ message: "Error reading CSV file" });
//             });

//     } catch (error) {
//         console.error('Error:', error);
//         return res.status(500).json({ message: "Error updating" });
//     }
// };



module.exports = {
    updateTamilMonth: updateTamilMonth,
    updateTamilStar: updateTamilStar,
    updatePaksham: updatePaksham,
    updateAyanam: updateAyanam,
    updateThidhi: updateThidhi,
    getAllTamilMonth: getAllTamilMonth,
    getAllTamilStar: getAllTamilStar,
    getAllAyanam: getAllAyanam,
    getAllPaksham: getAllPaksham,
    getAllThidhi: getAllThidhi
    // ,
    // updateAzagiyasingar:updateAzagiyasingar
};