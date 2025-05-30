<template>
	<UIBaseCard
		flat
		class="admin-service-card"
		:class="{ inactive: !service.is_active }"
	>
		<div class="admin-service-card__header">
			<div class="service-info">
				<div class="service-category">{{ service.category_name }}</div>
				<h3 class="service-title">{{ service.title }}</h3>
			</div>
			<div class="service-status">
				<q-toggle
					:model-value="service.is_active"
					@click="$emit('toggle', service)"
					class="status-toggle"
				/>
			</div>
		</div>

		<div class="admin-service-card__content">
			<div class="service-meta">
				<div class="meta-item">
					<span class="meta-label">ОПИСАНИЕ:</span>
					<span class="meta-value">{{
						service.description || "Не указано"
					}}</span>
				</div>
				<div class="meta-item">
					<span class="meta-label">ЦЕНА:</span>
					<span class="meta-value">{{ formatPrice(service.price) }}</span>
				</div>
				<div class="meta-item" v-if="service.duration">
					<span class="meta-label">ДЛИТЕЛЬНОСТЬ:</span>
					<span class="meta-value">{{ service.duration }} мин.</span>
				</div>
				<div class="meta-item">
					<span class="meta-label">КАТЕГОРИЯ:</span>
					<span class="meta-value">{{ service.category }}</span>
				</div>
				<div class="meta-item">
					<span class="meta-label">ПОРЯДОК:</span>
					<span class="meta-value">{{ service.sort_order }}</span>
				</div>
			</div>
		</div>

		<div class="admin-service-card__actions">
			<UIAdminButton
				label="РЕДАКТИРОВАТЬ"
				variant="secondary"
				@click="$emit('edit', service)"
			/>
			<UIAdminButton
				label="УДАЛИТЬ"
				variant="danger"
				@click="$emit('delete', service)"
			/>
		</div>
	</UIBaseCard>
</template>

<script setup>
const props = defineProps({
	service: {
		type: Object,
		required: true,
	},
});

const emit = defineEmits(["edit", "delete", "toggle"]);

const formatPrice = (price) => {
	if (!price) return "Не указана";
	return `${price} ₽`;
};
</script>

<style lang="scss" scoped>
@use "~/assets/styles/variables" as *;

.admin-service-card {
	border: 2px solid var(--color-black);
	border-radius: 0;
	transition: all 0.3s ease;
	background: var(--color-white);

	&.inactive {
		opacity: 0.6;
		border-color: var(--color-gray);
	}

	&:hover {
		box-shadow: 4px 4px 0px var(--color-black);
		transform: translateY(-2px);
	}
}

.admin-service-card__header {
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	padding: 1.5rem;
	border-bottom: 2px solid var(--color-black);

	.service-info {
		flex: 1;

		.service-category {
			font-family: "RF Dewi Condensed", sans-serif;
			font-weight: 600;
			font-size: 0.8rem;
			text-transform: uppercase;
			color: var(--color-gray);
			letter-spacing: 0.1em;
			margin-bottom: 0.5rem;
		}

		.service-title {
			font-family: "RF Dewi Extended", sans-serif;
			font-weight: 700;
			font-size: 1.1rem;
			text-transform: uppercase;
			color: var(--color-black);
			margin: 0;
			line-height: 1.2;
			letter-spacing: 0.05em;
		}
	}

	.service-status {
		flex-shrink: 0;
		margin-left: 1rem;

		.status-toggle {
			:deep(.q-toggle__inner) {
				color: var(--color-black);
			}

			:deep(.q-toggle__track) {
				background: var(--color-light-gray);
				border: 2px solid var(--color-black);
			}

			:deep(.q-toggle--truthy .q-toggle__track) {
				background: var(--color-black);
			}

			:deep(.q-toggle__thumb) {
				background: var(--color-white);
				border: 2px solid var(--color-black);
			}
		}
	}
}

.admin-service-card__content {
	padding: 1.5rem;
}

.service-meta {
	.meta-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 0.75rem;

		&:last-child {
			margin-bottom: 0;
		}

		.meta-label {
			font-family: "RF Dewi Condensed", sans-serif;
			font-weight: 600;
			font-size: 0.8rem;
			text-transform: uppercase;
			color: var(--color-dark);
			letter-spacing: 0.1em;
			flex-shrink: 0;
		}

		.meta-value {
			font-family: "RF Dewi", sans-serif;
			font-weight: 500;
			font-size: 0.9rem;
			color: var(--color-black);
			text-align: right;
			margin-left: 1rem;
			line-height: 1.3;
		}
	}
}

.admin-service-card__actions {
	display: flex;
	gap: 0.75rem;
	padding: 1.5rem;
	border-top: 2px solid var(--color-black);
}
</style> 