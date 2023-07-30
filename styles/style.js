import { StyleSheet } from "react-native";

export const gStyle = StyleSheet.create({
    screenContainer: {
        width: "100%",
        height: "100%",
        backgroundColor: "#ffffff",
      },
    headingContainer: {
        position: "relative",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "flex-end",
        width: "100%",
        height: 100,
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 12,
        borderStyle: "solid",
        borderColor: "#E8E8E8",
        borderBottomWidth: 1,
      },
    heading:{
        fontFamily: "Roboto-Medium",
        fontSize: 17,
        marginLeft: "auto",
        marginRight: "auto",
    },
    button: {
      backgroundColor: "#FF6C00",
      width: "100%",
      height: 50,
      marginTop: 43,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderRadius: 100,
    },
    buttonText: {
      color: "#ffffff",
      fontSize: 16,
      textAlign: "center",
    },
});