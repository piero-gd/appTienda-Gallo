import { Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import Modal from '../../components/Modal'

const index = ({ onItemListScreen }) => {

    const [textItem, setTextItem] = useState("")
    const [list, setList] = useState([])
    const [itemSelected, setItemSelected] = useState({});
    const [modalVisible, setModalVisible] = useState(false);

    const onHandleChangeText = (text) => {
        setTextItem(text)
        console.log(text)
    }

    const addItem = () => {
        console.log("aqui agregamos item", textItem)
        setList(prevState => [...prevState, { name: textItem, id: Math.random().toString() },
        ]);
        setTextItem("");
    }

    const onHandleModal = item => {
        console.log("en esta funcion seteo el item y abro modal")
        setItemSelected(item)
        setModalVisible(true)
    }

    const onHandleDelete = item => {
        console.log("eliminar este item", item)
        setList(prevState =>
            prevState.filter(element => element.name !== item.name))

        setModalVisible(false)
    }

    const renderItem = ({ item }) => (
        <View style={styles.renderItemStyle}>
            <Text>{item.name}</Text>
            <Button
                title="X"
                onPress={() => onHandleModal(item)}
                color={"red"}
            />
        </View>
    )

    return (
        <View>
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <Text style={styles.titleContainer}>Lista Productos</Text>
                    <View style={styles.buttonContainer}>
                        <Button title='Ir al carrito' onPress={() => onItemListScreen()} />
                    </View>
                    <View style={styles.addItemContainer}>
                        <TextInput
                            placeholder='elemento de la lista'
                            style={styles.input}
                            onChangeText={onHandleChangeText}
                            value={textItem}
                        />
                        <Button title="Presiona aqui" onPress={addItem} />
                    </View>
                </View>
                <View style={styles.listContainer}>
                    <FlatList
                        data={list}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                    />
                </View>
                <Modal
                    isVisible={modalVisible}
                    actionDeleteItem={() => onHandleDelete(itemSelected)}
                    itemSelected={itemSelected}
                />
            </View>
        </View>
    )
}

export default index

const styles = StyleSheet.create({
    buttonContainer: {
        paddingHorizontal: 40,
        paddingTop: 20,
        paddingBottom: 20,
    },
    inputContainer: {
        height: 200,
        paddingHorizontal: 30,
        paddingTop: 80,
    },
    titleContainer: {
        marginBottom: 30,
        fontSize: 40,
        fontWeight: "500",
        color: "#1E283C"
    },
    addItemContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    input: {
        borderBottomColor: "black",
        borderBottomWidth: 2,
        width: 200,
    },
    listContainer: {
        flex: 2,
        marginHorizontal: 30,
        marginTop: 20,
        padding: 3,
    },
    renderItemStyle: {
        height: 60,
        flexDirection: 'row',
        marginBottom: 25,
        backgroundColor: "white",
        borderRadius: 10,
        padding: 10,
        justifyContent: "space-around",
        alignItems: "center",
        shadowColor: "black",
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 2,
        elevation: 3,
    },
})