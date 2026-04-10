<script setup>
defineOptions({ name: "LocalesDemo" });
import { ref } from "vue";
import { Locale, Segmented } from "@svar-ui/vue-core";
import { Tasklist } from "../../src/index.js";
import { getData } from "../data.js";

import { de, cn } from "@svar-ui/tasklist-locales";
import { de as deCore, cn as cnCore } from "@svar-ui/core-locales";

const { data } = getData();

const langs = [
	{ id: "en", label: "EN" },
	{ id: "de", label: "DE" },
	{ id: "cn", label: "CN" },
];
const lang = ref("en");
</script>

<template>
	<div class="toolbar">
		<Segmented :options="langs" v-model:value="lang" />
	</div>
	<div style="margin: 20px; max-width: 700px; margin-top: 40px">
		<Locale v-if="lang === 'de'" :words="{ ...de, deCore }">
			<Tasklist :value="data" />
		</Locale>
		<Locale v-else-if="lang === 'cn'" :words="{ ...cn, cnCore }">
			<Tasklist :value="data" />
		</Locale>
		<Tasklist v-else :value="data" />
	</div>
</template>

<style scoped>
.toolbar {
	margin: 20px;
}
</style>
