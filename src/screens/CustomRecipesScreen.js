import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

export default function CustomRecipesScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { recipe } = route.params || {};

  if (!recipe) {
    return (
      <View style={styles.container}>
        <Text style={styles.recipeTitle}>No Recipe Details Available</Text>
      </View>
    );
  }

  // نحوّل النص إلى قائمة: كل سطر عنصر، ونتجاهل الأسطر الفارغة
  const toList = (text) =>
    text ? text.split("\n").filter((line) => line.trim() !== "") : [];
  const ingredientsList = toList(recipe.ingredients);
  const stepsList = toList(recipe.steps);

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
      testID="scrollContent"
    >
      {/* Recipe Image */}
      <View style={styles.imageContainer} testID="imageContainer">
        {recipe.image ? (
          <Image source={{ uri: recipe.image }} style={styles.recipeImage} />
        ) : null}
      </View>

      {/* Back Button */}
      <View style={styles.topButtonsContainer} testID="topButtonsContainer">
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text>GoBack</Text>
        </TouchableOpacity>
      </View>

      {/* Recipe Details */}
      <View style={styles.contentContainer} testID="contentContainer">
        <Text style={styles.recipeTitle}>{recipe.title}</Text>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Content</Text>
          <Text style={styles.contentText}>{recipe.description}</Text>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Ingredients</Text>
          {ingredientsList.length > 0 ? (
            ingredientsList.map((item, index) => (
              <Text key={index} style={styles.contentText}>• {item}</Text>
            ))
          ) : (
            <Text style={styles.contentText}>No ingredients added.</Text>
          )}
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Instructions</Text>
          {stepsList.length > 0 ? (
            stepsList.map((step, index) => (
              <Text key={index} style={styles.contentText}>
                {index + 1}. {step}
              </Text>
            ))
          ) : (
            <Text style={styles.contentText}>No instructions added.</Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
}
  const styles = StyleSheet.create({
    container: {
      backgroundColor: "white",
      flex: 1,
    },
    scrollContent: {
      paddingBottom: 30,
    },
    imageContainer: {
      flexDirection: "row",
      justifyContent: "center",
    },
    recipeImage: {
      width: wp(98),
      height: hp(50),
      borderRadius: 35,
      borderBottomLeftRadius: 40,
      borderBottomRightRadius: 40,
      marginTop: 4,
    },
    contentContainer: {
      paddingHorizontal: wp(4),
      paddingTop: hp(4),
    },
    recipeTitle: {
      fontSize: hp(3),
      fontWeight: "bold",
      color: "#4B5563",
      marginBottom: hp(2),
    },
    sectionContainer: {
      marginBottom: hp(2),
    },
    sectionTitle: {
      fontSize: hp(2.5),
      fontWeight: "bold",
      color: "#4B5563",
      marginBottom: hp(1),
    },
    topButtonsContainer: {
      width: "100%",
      position: "absolute",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingTop: hp(4),
    },
    backButton: {
      padding: 8,
      borderRadius: 50,
      marginLeft: wp(5),
      backgroundColor: "white",
    },
    favoriteButton: {
      padding: 8,
      borderRadius: 50,
      marginRight: wp(5),
      backgroundColor: "white",
    },
    contentText: {
      fontSize: hp(1.6),
      color: "#4B5563",
    },
  });
  