document.addEventListener('DOMContentLoaded', function () {
	const elems = document.querySelectorAll('.sidenav');
	M.Sidenav.init(elems);
	const dateEl = document.querySelectorAll('.datepicker');
	M.Datepicker.init(dateEl);
	const timeEl = document.querySelectorAll('.timepicker');
	M.Timepicker.init(timeEl);
});
