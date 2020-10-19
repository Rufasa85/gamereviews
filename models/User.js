module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define('User', {
        // add properites here
        name: {
            type: DataTypes.STRING,
            allowNull:false
        },
        email:{
            type: DataTypes.STRING,
            allowNull:false,
            unique:true
        }
    });

    User.associate = function(models) {
        // add associations here
        User.hasMany(models.Review,{
            onDelete:'cascade'
        });
    };

    return User;
};