import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import userPhoto from "../assets/images/userPhoto.jpg";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { gStyle } from "../styles/style";

const PostsScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={gStyle.screenContainer}>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Публікації</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          style={styles.logoutButton}
        >
          <Feather name="log-out" size={24} color={"#BDBDBD"} />
        </TouchableOpacity>
      </View>
      <View style={styles.userCard}>
        <Image style={styles.userPhoto} source={userPhoto} />
        <View>
          <Text style={styles.userName}>Natali Romanova</Text>
          <Text style={styles.userEmail}>email@example.com</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    marginLeft: "auto",
    marginRight: "auto",
  },
  logoutButton: {
    paddingRight: 10,
  },
  userCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 30,
  },

  userPhoto: {
    width: 60,
    height: 60,
    borderRadius: 16,
  },

  userName: {
    fontFamily: "Roboto-Bold",
    fontSize: 13,
    lineHeight: 15,
    color: "#212121",
  },

  userEmail: {
    fontFamily: "Roboto-Regular",
    fontSize: 11,
    lineHeight: 13,
    color: "#212121",
  },
});

export default PostsScreen;
