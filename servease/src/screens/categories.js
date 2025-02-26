import { View, Text, StyleSheet} from 'react-native'

const Categories = () => {
    return (
        <View style={styles.container}>
            <Text style={{color: '#fff'}}>Categories</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#222831',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default Categories;