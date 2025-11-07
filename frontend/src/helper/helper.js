export function formatDateForInput(isoDate) {
	if (!isoDate) return "";
	return isoDate.split("T")[0];
}

/**
 * Convert YYYY-MM-DD from input to ISO string for backend
 */
export function formatDateForBackend(dateString) {
	if (!dateString) return null;
	return new Date(dateString).toISOString();
}
