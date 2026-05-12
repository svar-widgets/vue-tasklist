<script setup>
import { ref } from 'vue';
import { Tasklist } from "../../src/index.js";
import { Segmented } from "@svar-ui/vue-core";
import { RestURL } from "@svar-ui/lib-data-provider";

const url = new RestURL(
	"https://tasklist-backend.svar.dev/tasks"
);

const id = ref(1);
const options = [
	{ id: 1, label: "Work" },
	{ id: 2, label: "Rest" },
];
</script>

<template>
	<div>
		<div class="toolbar">
			<Segmented v-model:value="id" :options="options" />
		</div>
		<div class="tasks">
			<Tasklist
				:value="id"
				:ondata="v => url.get(v)"
				:onchange="({ action, task, id, originalValue: v }) =>
					url.path(v).save(action, task, id)"
			/>
		</div>
	</div>
</template>

<style scoped>
.toolbar {
	height: 56px;
	padding: 12px;
}
.tasks {
	margin: 20px;
	max-width: 768px;
	height: calc(100% - 56px);
}
</style>
