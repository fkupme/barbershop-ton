<template>
	<div class="admin-image-card">
		<div class="admin-image-card__image">
			<img
				v-if="image.image_url"
				:src="image.image_url"
				:alt="image.alt_text"
				class="admin-image-card__img"
			/>
			<div v-else class="admin-image-card__placeholder">
				<Icon name="mdi:image-outline" class="placeholder-icon" />
			</div>

			<div class="admin-image-card__overlay">
				<div class="overlay-content">
					<UIMainButton
						label="ПРЕДПРОСМОТР"
						custom-class="preview-btn"
						@click="$emit('preview', image)"
					/>
				</div>
			</div>
		</div>

		<div class="admin-image-card__content">
			<div class="admin-image-card__header">
				<div class="admin-image-card__status">
					<q-chip
						:color="image.is_active ? 'positive' : 'negative'"
						text-color="white"
						:label="image.is_active ? 'АКТИВНО' : 'СКРЫТО'"
						size="sm"
					/>
				</div>
				<div class="admin-image-card__order">
					<span class="order-label">ПОРЯДОК:</span>
					<span class="order-value">{{ image.sort_order }}</span>
				</div>
			</div>

			<div class="admin-image-card__meta">
				<div class="meta-item" v-if="image.alt_text">
					<span class="meta-label">ALT ТЕКСТ:</span>
					<span class="meta-value">{{ image.alt_text }}</span>
				</div>
				<div class="meta-item" v-if="image.image_url">
					<span class="meta-label">URL:</span>
					<span class="meta-value meta-url">{{
						truncateUrl(image.image_url)
					}}</span>
				</div>
				<div class="meta-item" v-if="image.created_at">
					<span class="meta-label">СОЗДАНО:</span>
					<span class="meta-value">{{ formatDate(image.created_at) }}</span>
				</div>
			</div>

			<div class="admin-image-card__actions">
				<UIAdminButton
					label="РЕДАКТИРОВАТЬ"
					variant="secondary"
					@click="$emit('edit', image)"
				/>

				<UIAdminButton
					label="УДАЛИТЬ"
					variant="danger"
					@click="$emit('delete', image)"
				/>

				<UIAdminButton
					:label="image.is_active ? 'СКРЫТЬ' : 'ПОКАЗАТЬ'"
					:variant="image.is_active ? 'secondary' : 'success'"
					@click="$emit('toggle', image)"
				/>
			</div>
		</div>
	</div>
</template>

<script setup>
defineProps({
	image: {
		type: Object,
		required: true,
	},
});

defineEmits(["edit", "delete", "toggle", "preview"]);

// Вспомогательные функции
const truncateUrl = (url) => {
	if (!url) return "";
	return url.length > 40 ? url.substring(0, 37) + "..." : url;
};

const formatDate = (date) => {
	if (!date) return "";
	return new Date(date).toLocaleDateString("ru-RU", {
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
	});
};
</script>

<style lang="scss" scoped>
@use "~/assets/styles/variables" as *;

.admin-image-card {
	background: var(--color-white);
	border: 2px solid var(--color-black);
	border-radius: 0;
	overflow: hidden;
	transition: transform 0.2s ease;

	&:hover {
		transform: translateY(-2px);
		box-shadow: 4px 4px 0px var(--color-black);

		.admin-image-card__overlay {
			opacity: 1;
		}
	}
}

.admin-image-card__image {
	height: 250px;
	width: 100%;
	overflow: hidden;
	background: var(--color-light);
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
}

.admin-image-card__img {
	width: 100%;
	height: 100%;
	object-fit: cover;
}

.admin-image-card__placeholder {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
	width: 100%;

	.placeholder-icon {
		font-size: 3rem;
		color: var(--color-gray);
	}
}

.admin-image-card__overlay {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.7);
	display: flex;
	align-items: center;
	justify-content: center;
	opacity: 0;
	transition: opacity 0.3s ease;

	.overlay-content {
		text-align: center;
	}

	.preview-btn :deep(.q-btn) {
		background: var(--color-white);
		color: var(--color-black);
		font-size: 0.85rem;
		padding: 8px 16px;
	}
}

.admin-image-card__content {
	padding: 1.5rem;
}

.admin-image-card__header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 1rem;
}

.admin-image-card__status {
	flex-shrink: 0;
}

.admin-image-card__order {
	display: flex;
	align-items: center;
	gap: 0.5rem;

	.order-label {
		font-family: "RF Dewi Condensed", sans-serif;
		font-weight: 600;
		font-size: 0.8rem;
		text-transform: uppercase;
		color: var(--color-dark);
		letter-spacing: 0.5px;
	}

	.order-value {
		font-family: "RF Dewi Extended", sans-serif;
		font-weight: 700;
		font-size: 1rem;
		color: var(--color-black);
		background: var(--color-light);
		padding: 4px 8px;
		border: 1px solid var(--color-black);
	}
}

.admin-image-card__meta {
	margin-bottom: 1.5rem;

	.meta-item {
		display: flex;
		flex-direction: column;
		margin-bottom: 0.75rem;

		&:last-child {
			margin-bottom: 0;
		}
	}

	.meta-label {
		font-family: "RF Dewi Condensed", sans-serif;
		font-weight: 600;
		font-size: 0.8rem;
		text-transform: uppercase;
		color: var(--color-dark);
		letter-spacing: 0.5px;
		margin-bottom: 0.25rem;
	}

	.meta-value {
		font-family: "RF Dewi", sans-serif;
		font-weight: 500;
		font-size: 0.9rem;
		color: var(--color-black);
		line-height: 1.3;

		&.meta-url {
			font-family: monospace;
			font-size: 0.8rem;
			color: var(--color-gray);
			word-break: break-all;
		}
	}
}

.admin-image-card__actions {
	display: flex;
	flex-wrap: wrap;
	gap: 0.75rem;
	padding: 1.5rem;
	border-top: 2px solid var(--color-black);
}

// CSS переменные
:root {
	--color-white: #ffffff;
	--color-black: #000000;
	--color-dark: #333333;
	--color-gray: #666666;
	--color-light: #f8f9fa;
}
</style> 