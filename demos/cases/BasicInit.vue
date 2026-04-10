<script setup>
import { Tasklist } from "../../src/index.js";
import { getData } from "../data.js";

const { data } = getData();
</script>

<template>
	<div>
		<div class="wrapper">
			<Tasklist :value="data" />
		</div>
	</div>
</template>

<style scoped>
.wrapper {
	margin: 20px;
	max-width: 768px;
	height: 100%;
}
</style>
