<template>
	<div class="admin-product-card">
		<div class="admin-product-card__image">
			<img
				v-if="product.image_url"
				:src="product.image_url"
				:alt="product.title"
				class="admin-product-card__img"
			/>
			<div v-else class="admin-product-card__placeholder">
				<Icon name="mdi:image-outline" class="placeholder-icon" />
			</div>
		</div>

		<div class="admin-product-card__content">
			<div class="admin-product-card__header">
				<h3 class="admin-product-card__title">{{ product.title }}</h3>
				<div class="admin-product-card__status">
					<q-chip
						:color="product.is_active ? 'positive' : 'negative'"
						text-color="white"
						:label="product.is_active ? 'АКТИВЕН' : 'СКРЫТ'"
						size="sm"
					/>
				</div>
			</div>

			<p class="admin-product-card__description">{{ product.description }}</p>

			<div class="admin-product-card__meta">
				<div class="meta-item">
					<span class="meta-label">КАТЕГОРИЯ:</span>
					<span class="meta-value">{{ product.category_name }}</span>
				</div>
				<div class="meta-item" v-if="product.price">
					<span class="meta-label">ЦЕНА:</span>
					<span class="meta-value">{{ product.price }} ₽</span>
				</div>
				<div class="meta-item">
					<span class="meta-label">ПОРЯДОК:</span>
					<span class="meta-value">{{ product.sort_order }}</span>
				</div>
			</div>

			<div
				class="admin-product-card__tags"
				v-if="product.tags && product.tags.length"
			>
				<q-chip
					v-for="tag in product.tags"
					:key="tag"
					size="sm"
					outline
					:label="tag"
				/>
			</div>

			<div class="admin-product-card__actions">
				<UIAdminButton
					label="РЕДАКТИРОВАТЬ"
					variant="secondary"
					@click="$emit('edit', product)"
				/>

				<UIAdminButton
					label="УДАЛИТЬ"
					variant="danger"
					@click="$emit('delete', product)"
				/>

				<UIAdminButton
					:label="product.is_active ? 'СКРЫТЬ' : 'ПОКАЗАТЬ'"
					:variant="product.is_active ? 'secondary' : 'success'"
					@click="$emit('toggle', product)"
				/>
			</div>
		</div>
	</div>
</template>

<script setup>
defineProps({
	product: {
		type: Object,
		required: true,
	},
});

defineEmits(["edit", "delete", "toggle"]);
</script>

<style lang="scss" scoped>
@use "~/assets/styles/variables" as *;

.admin-product-card {
	background: var(--color-white);
	border: 2px solid var(--color-black);
	border-radius: 0;
	overflow: hidden;
	transition: transform 0.2s ease;

	&:hover {
		transform: translateY(-2px);
		box-shadow: 4px 4px 0px var(--color-black);
	}
}

.admin-product-card__image {
	height: 200px;
	width: 100%;
	overflow: hidden;
	background: var(--color-light);
	display: flex;
	align-items: center;
	justify-content: center;
}

.admin-product-card__img {
	width: 100%;
	height: 100%;
	object-fit: cover;
}

.admin-product-card__placeholder {
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

.admin-product-card__content {
	padding: 1.5rem;
}

.admin-product-card__header {
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	margin-bottom: 1rem;
}

.admin-product-card__title {
	font-family: "RF Dewi Extended", sans-serif;
	font-weight: 700;
	font-size: 1.1rem;
	text-transform: uppercase;
	line-height: 1.3;
	color: var(--color-black);
	margin: 0;
	letter-spacing: 0.5px;
	flex: 1;
	margin-right: 1rem;
}

.admin-product-card__status {
	flex-shrink: 0;
}

.admin-product-card__description {
	font-family: "RF Dewi Condensed", sans-serif;
	font-size: 0.95rem;
	line-height: 1.4;
	color: var(--color-gray);
	margin: 0 0 1rem 0;
}

.admin-product-card__meta {
	margin-bottom: 1rem;

	.meta-item {
		display: flex;
		justify-content: space-between;
		margin-bottom: 0.5rem;

		&:last-child {
			margin-bottom: 0;
		}
	}

	.meta-label {
		font-family: "RF Dewi Condensed", sans-serif;
		font-weight: 600;
		font-size: 0.85rem;
		text-transform: uppercase;
		color: var(--color-dark);
		letter-spacing: 0.5px;
	}

	.meta-value {
		font-family: "RF Dewi", sans-serif;
		font-weight: 500;
		font-size: 0.9rem;
		color: var(--color-black);
	}
}

.admin-product-card__tags {
	margin-bottom: 1.5rem;
	display: flex;
	flex-wrap: wrap;
	gap: 0.5rem;
}

.admin-product-card__actions {
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