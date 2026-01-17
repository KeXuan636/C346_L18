import React, { useState, useEffect } from 'react';
import {
    FlatList,
    StatusBar,
    Text,
    TextInput,
    View,
    Image,
    StyleSheet
} from 'react-native';

const App = () => {
    const [myData, setMyData] = useState([]);
    const [originalData, setOriginalData] = useState([]);

    useEffect(() => {
        const myurl = "https://onlinecardappwebservice-xfwf.onrender.com/allcards";

        fetch(myurl)
            .then(response => response.json())
            .then(myJson => {
                setMyData(myJson);
                setOriginalData(myJson);
            })
            .catch(error => console.log(error));
    }, []);

    const FilterData = (text) => {
        if (text !== '') {
            const filteredData = originalData.filter(item =>
                item.card_name
                    .toLowerCase()
                    .includes(text.toLowerCase())
            );
            setMyData(filteredData);
        } else {
            setMyData(originalData);
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <Image
                source={{ uri: item.card_pic }}
                style={styles.image}
            />

            <Text style={styles.cardName}>
                {item.card_name}
            </Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <StatusBar />

            <Text style={styles.title}>Search Cards</Text>

            <TextInput
                style={styles.searchBar}
                placeholder="Type card name..."
                onChangeText={FilterData}
            />

            <FlatList
                data={myData}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
};

export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    title: {
        fontSize: 20,
        marginBottom: 10,
        fontWeight: 'bold'
    },
    input: {
        borderWidth: 1,
        padding: 8,
        marginBottom: 10
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    image: {
        width: 50,
        height: 50,
        marginRight: 10
    }
});