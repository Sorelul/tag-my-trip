import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import CountryItem from "./CountryItem";

function CountriesList({ cities, isLoading }) {
    if (isLoading) {
        return <Spinner />;
    }

    if (!cities.length) {
        return <Message message="Add your first country by clicking on a city on the map" />;
    }

    const countries = cities.reduce((arr, city) => {
        if (arr.map((el) => el.country).includes(city.country)) {
            return arr;
        } else {
            return [...arr, { country: city.country, emoji: city.emoji }];
        }
    }, []);

    return (
        <ul className={styles.countryList}>
            {countries.map((country) => (
                <CountryItem key={country.country} country={country} />
            ))}
        </ul>
    );
}

export default CountriesList;
