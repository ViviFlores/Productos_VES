import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    textRedirect: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    icon: {
        width: 32,
        height: 32
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    card: {
        flex: 1,
        backgroundColor: '#F9F9F9',
        margin: 3

    },
    noImage: {
        width: '100%',
        height: 200
    },
    image: {
        flex: 1,
        width: '100%',
        height: 200
    },
    detailImage: {
        width: 300,
        height: 300,
        marginHorizontal: 7
    },
    detailInputs: {
        flexDirection: 'row',
        marginHorizontal: 15,
        marginVertical: 5,
        gap: 10
    },
    buttonGroup: {
        margin: 2,
        marginTop: 20,
        marginHorizontal: 15
    }
})