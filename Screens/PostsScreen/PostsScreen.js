import { View, Text, StyleSheet,TouchableOpacity } from "react-native";

const PostsScreen = () => {
  const handleLogoutButtonPress = () => {
    console.log("Logout button pressed");
  };

  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Публікації</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogoutButtonPress}>
          <Text style={styles.logoutButtonText}>Logout</Text>    
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
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
    height: 90,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 12,
    borderStyle: "solid",
    borderColor: "#E8E8E8",
    borderBottomWidth: 1,
  },
  heading: {
    fontFamily: "Roboto-Medium",
    fontSize: 17,
    marginLeft:'auto',
    marginRight:'auto',
  },
  logoutButton:{
    // width:24,
    height:24,
    backgroundColor: "#f8f8f8",
  },
  logoutButtonText:{
    fontSize: 12,
  }
});

export default PostsScreen;
