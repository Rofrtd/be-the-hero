import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { View, FlatList, Image, Text, TouchableOpacity } from "react-native";

import api from "../../services/api";
import logoImg from "../../assets/logo.png";
import styles from "./styles";

export default function Cases() {
  const [cases, setCases] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  function navigateToDetail(casex) {
    navigation.navigate("Detail", { casex });
  }

  async function loadCases() {
    if (loading) {
      return;
    }

    if (total > 0 && cases.length == total) {
      return;
    }

    setLoading(true);
    const response = await api.get("cases", { params: { page } });
    setCases([...cases, ...response.data]);
    setTotal(response.headers["x-total-count"]);
    setPage(page + 1);
    setLoading(false);
  }

  useEffect(() => {
    loadCases();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <Text style={styles.headerText}>
          Total of <Text style={styles.headerTextBold}>{total} cases</Text>.
        </Text>
      </View>
      <Text style={styles.title}>Welcome!</Text>
      <Text style={styles.description}>
        Choose one of the cases and save the day!
      </Text>

      <FlatList
        data={cases}
        style={styles.caseList}
        showsVerticalScrollIndicator={false}
        keyExtractor={casex => String(casex.id)}
        onEndReached={loadCases}
        onEndReachedThreshold={0.2}
        renderItem={({ item: casex }) => (
          <View style={styles.caseList}>
            <View style={styles.case}>
              <Text style={styles.caseProperty}>NGO:</Text>
              <Text style={styles.caseValue}>{casex.name}</Text>

              <Text style={styles.caseProperty}>Case:</Text>
              <Text style={styles.caseValue}>{casex.title}</Text>

              <Text style={styles.caseProperty}>Cost:</Text>
              <Text style={styles.caseValue}>
                {Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: "AUD"
                }).format(casex.value)}
              </Text>

              <TouchableOpacity
                style={styles.detailsButton}
                onPress={() => navigateToDetail(casex)}
              >
                <Text style={styles.detailsButtonText}>More details.</Text>
                <Feather name="arrow-right" size={16} color="#e02041"></Feather>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}
