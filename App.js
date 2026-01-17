import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    TextInput,
    StyleSheet,
    StatusBar
} from 'react-native';

const App = () => {
    const [movies, setMovies] = useState([]);
    const [originalMovies, setOriginalMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMovies();
    }, []);

    const fetchMovies = () => {
        const url = 'https://movieappwebservice.onrender.com/allmovies';

        fetch(url)
            .then(response => response.json())
            .then(data => {
                setMovies(data);
                setOriginalMovies(data);
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
                setLoading(false);
            });
    };

    const filterMovies = (text) => {
        if (text !== '') {
            const filtered = originalMovies.filter(movie =>
                movie.title.toLowerCase().includes(text.toLowerCase())
            );
            setMovies(filtered);
        } else {
            setMovies(originalMovies);
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.text}>Genre: {item.genre}</Text>
            <Text style={styles.text}>Rating: {item.rating}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <StatusBar />

            <Text style={styles.header}>Movie List</Text>

            <TextInput
                style={styles.searchBar}
                placeholder="Search by movie title..."
                onChangeText={filterMovies}
            />

            {loading ? (
                <Text>Loading movies...</Text>
            ) : (
                <FlatList
                    data={movies}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                />
            )}
        </View>
    );
};

export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10
    },
    searchBar: {
        borderWidth: 1,
        padding: 8,
        marginBottom: 10,
        borderRadius: 5
    },
    card: {
        padding: 12,
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        backgroundColor: '#f9f9f9'
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    text: {
        fontSize: 14
    }
});
