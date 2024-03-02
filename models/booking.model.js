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
      CustomerId: {
        type: DataTypes.INTEGER,
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
      },
      AgencyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      OpeningForSalesDetailId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      AmountDeposit: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );

  Booking.belongsTo(sequelize.models.Project, { foreignKey: "ProjectId" });
  Booking.belongsTo(sequelize.models.Customer, { foreignKey: "CustomerId" });
  Booking.belongsTo(sequelize.models.Agency, { foreignKey: "AgencyId" });
  Booking.belongsTo(sequelize.models.OpeningForSalesDetail, {
    foreignKey: "OpeningForSalesDetailId",
  });

  return Booking;
};
