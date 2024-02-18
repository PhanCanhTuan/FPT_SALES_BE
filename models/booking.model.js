const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Booking = sequelize.define(
    "Booking",
    {
      BookingId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      ProjectId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      CustomerName: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      CustomerEmail: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      CustomerPhoneNumber: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      BookingDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      Status: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      SelectionMethod: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      IsSelected: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );

  Booking.belongsTo(sequelize.models.Project, { foreignKey: "ProjectId" });

  return Booking;
};
