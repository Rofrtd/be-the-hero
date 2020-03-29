import React from "react";
import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { View, Image, Text, TouchableOpacity, Linking } from "react-native";
import styles from "./styles";
import * as MailComposer from "expo-mail-composer";

import logoImg from "../../assets/logo.png";

export default function Detail() {
  const navigation = useNavigation();
  const route = useRoute();

  const casex = route.params.casex;
  const message = `Hi ${casex.name}, I'm contacting you regarding the case ${
    casex.title
  } with cost of ${Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "AUD"
  }).format(casex.value)}`;

  function navigateBack() {
    navigation.goBack();
  }

  function sendMail() {
    MailComposer.composeAsync({
      subject: `Hero of the day: ${casex.title}`,
      recipients: [casex.email],
      body: message
    });
  }

  function sendWhatsapp() {
    Linking.openURL(`whatsapp://send?phone=${casex.whatsapp}=${message}`);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <TouchableOpacity onPress={navigateBack}>
          <Feather name="arrow-left" size={28} color="#e82041"></Feather>
        </TouchableOpacity>
      </View>
      <View style={styles.case}>
        <Text style={[styles.caseProperty, { marginTop: 0 }]}>NGO:</Text>
        <Text style={styles.caseValue}>
          {casex.name} from {casex.city}-{casex.state}
        </Text>

        <Text style={styles.caseProperty}>Case:</Text>
        <Text style={styles.caseValue}>{casex.title}</Text>

        <Text style={styles.caseProperty}>Cost:</Text>
        <Text style={styles.caseValue}>{casex.value}</Text>
      </View>
      <View style={styles.contactBox}>
        <Text style={styles.heroTitle}>Save the day!</Text>
        <Text style={styles.heroTitle}>Be the hero for this case.</Text>
        <Text style={styles.heroDescription}>Contact us:</Text>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
            <Text style={styles.textAction}>Whatsapp</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.action} onPress={sendMail}>
            <Text style={styles.textAction}>E-mail</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
