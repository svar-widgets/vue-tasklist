<script setup>
defineOptions({ name: "EventsDemo" });
import { ref } from 'vue';
import { Tasklist } from "../../src/index.js";
import { getData } from "../data.js";

const { data } = getData();
const message = ref("");

function onchange({ action, task, id }) {
	switch (action) {
		case "add":
			message.value = `New task: "${task.content}" was added `;
			break;
		case "update":
			message.value = `Task with id: ${task.id} was updated `;
			break;
		case "delete":
			message.value = `Task with id: ${id} was deleted `;
			break;
	}
}
</script>

<template>
	<div class="message">{{ message }}</div>
	<div>
		<div class="wrapper">
			<Tasklist :value="data" :onchange="onchange" />
		</div>
	</div>
</template>

<style scoped>
.message {
	padding: 5px 10px;
	background-color: #eee;
	color: #444;
	line-height: 33px;
	height: 40px;
}
.wrapper {
	margin: 20px;
	max-width: 768px;
	height: 100%;
}
</style>
