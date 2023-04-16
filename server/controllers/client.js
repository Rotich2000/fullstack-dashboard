import User from "../models/User.js";
import Product from "../models/Product.js";
import ProductStat from "../models/ProductStat.js";
import Transaction from "../models/Transaction.js";
import getCountryIso3 from "country-iso-2-to-3";
// import countryIso2To3 from "country-iso-2-to-3";

export const getProducts = async (req, res) => {
  try {
    /** lets grab all the products and product stats we can find */
    const products = await Product.find();

    /** This too slow :( */
    const productWithStats = await Promise.all(
      products.map(async (product) => {
        const stat = await ProductStat.find({ productId: product._id });
        return {
          ...product._doc,
          stat,
        };
      })
    );

    res.status(200).json(productWithStats);
  } catch (error) {
    res.status(404).json({ message: "Product not found!" });
  }
};

export const getCustomers = async (req, res) => {
  try {
    const customers = await User.find({ role: "user" }).select("-password");
    res.status(200).json(customers);
  } catch (error) {
    res.status(404).json({ message: "Not found" });
  }
};

export const getTransactions = async (req, res) => {
  try {
    // sort should look like this: {"field" : "userId", "sort": "desc"}
    const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;
    // formatted sort should look like this: {userId: -1} an object not a string
    const generateSort = () => {
      const sortParsed = JSON.parse(sort);
      const sortFormatted = {
        [sortParsed.field]: (sortParsed.sort = "asc" ? 1 : -1),
      };
      return sortFormatted;
    };

    const sortFormatted = Boolean(sort) ? generateSort() : {};

    const transactions = await Transaction.find({
      $or: [
        { cost: { $regex: new RegExp(search, "i") } },
        { userId: { $regex: new RegExp(search, "i") } },
      ],
    })
      .sort(sortFormatted)
      .skip(page * pageSize)
      .limit(pageSize);

    const total = await Transaction.countDocuments({
      userId: { $regex: search, $options: "i" },
    });

    res.status(200).json({
      transactions,
      total,
    });
  } catch (error) {
    res.status(404).json({ message: "Not Found!" });
  }
};

/** Get geography */
export const getGeography = async (req, res) => {
  try {
    /** get the users object from the backend. */
    const users = await User.find();

    const mappedLocations = users.reduce((acc, { country }) => {
      /** take the country property and get the three-letter ISO code */
      const countryISO3 = getCountryIso3(country);
      /**
       * check the current countryISO3 exists as a key in the acc object, If it doesn't exist:
       * It creates a new key-value pair in acc with the key as countryISO3 and the value as 0.
       */
      if (!acc[countryISO3]) {
        acc[countryISO3] = 0;
      }
      /** increment the value of countryISO3 key in acc by 1. */
      acc[countryISO3]++;
      /** return the updated acc object */
      return acc;
    }, {});

    /** lastly format the locations in https://nivo.rocks/choropleth/ format */
    const formattedLocations = Object.entries(mappedLocations).map(
      /** [key, value]  pair */
      ([country, count]) => {
        return { id: country, value: count };
      }
    );
    res.status(200).json(formattedLocations);
  } catch (error) {
    res.status(404).json({ message: `Not Found! -> ${error}` });
  }
};
