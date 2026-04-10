<script setup>
defineOptions({ name: "TasklistLayout" });
import { ref, watch, inject, provide } from "vue";
import { Button } from "@svar-ui/vue-core";
import { tempID } from "@svar-ui/lib-state";
import Task from "./Task.vue";

const props = defineProps({
	data: {},
	readonly: { default: false },
	onchange: { type: Function },
});

const _ = inject("wx-i18n").getGroup("tasklist");

// Prevent associating Checkboxes with outer Field label
provide("wx-input-id", null);

const data = ref(props.data ?? []);
watch(() => props.data, (v) => { data.value = v ?? []; });

const edit = ref(null);
const editTask = ref(null);

function openEditor() {
	edit.value = -1;
	editTask.value = { id: -1, content: "", status: 0 };
}

function add(content) {
	const task = {
		id: tempID(),
		content,
		status: 0,
	};

	data.value = [...data.value, task];
	if (props.onchange) {
		const res = props.onchange({ value: data.value, task, action: "add" });
		if (res && typeof res === "object") {
			if (res.then) {
				res.then(responseData => {
					updateAfter(task.id, responseData);
				});
			} else {
				updateAfter(task.id, res);
			}
		}
	}
}

function updateAfter(id, responseData) {
	const index = data.value.findIndex(d => d.id === id);

	const copy = [...data.value];
	copy[index] = { ...data.value[index], ...responseData };
	data.value = copy;
	props.onchange?.({ value: data.value, action: "update" });
}

function remove(id) {
	if (edit.value === id) edit.value = null;

	data.value = data.value.filter(d => d.id !== id);
	if (id !== -1)
		props.onchange?.({ value: data.value, id, action: "delete" });
}

function update(id, content, status) {
	let task;
	data.value = data.value.map(d => {
		if (d.id === id) {
			task = { ...d, content, status };
			return task;
		} else return d;
	});
	edit.value = null;

	props.onchange?.({ value: data.value, id, action: "update", task });
}

function onremove(id) {
	remove(id);
}

function onedit(id) {
	if (!props.readonly) edit.value = id;
}

function onupdate({ task, content, status, next }) {
	if (task.id === -1) {
		edit.value = null;
		if (content) {
			add(content);
			if (next) {
				openEditor();
			}
		} else {
			remove(task.id);
		}
	} else {
		if (content) {
			if (content !== task.content || status !== task.status) {
				update(task.id, content, status);
			}
		} else {
			remove(task.id);
		}
		edit.value = null;
	}
}
</script>

<template>
	<div class="wx-tasks-list">
		<div class="wx-list">
			<Task
				v-for="task in data"
				:key="task.id"
				:task="task"
				:edit="edit"
				:onupdate="onupdate"
				:onremove="onremove"
				:onedit="onedit"
				:readonly="props.readonly"
			/>
			<Task
				v-if="edit === -1"
				:task="editTask"
				:edit="edit"
				:onupdate="onupdate"
			/>
		</div>
		<div v-if="!props.readonly && edit !== -1" class="wx-button">
			<Button :onclick="openEditor">{{ _("Add task") }}</Button>
		</div>
	</div>
</template>

<style scoped>
.wx-tasks-list {
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
}

.wx-button {
	width: 100%;
}

.wx-list {
	display: flex;
	flex-direction: column;
	margin-bottom: 4px;
	overflow-y: auto;
	flex: 1;
}
</style>
