// testResultsFormatter.js
// Function to get test results dynamically
function getTestResults() {
	const testResults = global.testResults || {};

	// Generate HTML dynamically based on test results
	const suiteResultsHTML = Object.keys(testResults).map((suiteName) => {
		const suite = testResults[suiteName];
		const suiteHeader = `<h2>Test Suite: ${suiteName}</h2>`;

		// Generate HTML for each test case in the suite
		const testCasesHTML = suite.tests.map((test) => {
			const status = test.passed ? '✔' : '✖'; // Use check and cross symbols
			const position = suiteName; // Using suiteName as the "Position" (file name of the tests)
			const additionalInfo = test.passed ? '' : 'See Console'; // Additional info for pass/fail
			const date = new Date().toLocaleDateString(); // Using the current date as the "Actions" (date the tests were run)

			// Check if test.func is defined before accessing its properties
			const testFuncText = test.func ? test.func.toString() : '';

			return `
			<tr>
				<td>
					<div class="d-flex align-items-center">
						<div class="ms-3">
							<p class="fw-bold mb-1">${suiteName}</p>
							<p class="text-muted mb-0">${test.name}</p>
						</div>
					</div>
				</td>
				<td>
					<p class="fw-normal mb-1">${test.name}</p>
					<p class="text-muted mb-0">${testFuncText}</p>
				</td>
				<td>
					<span class="badge ${
						test.passed ? 'badge-success' : 'badge-danger'
					} rounded-pill d-inline">${status}</span>
				</td>
				<td>${position}</td>
				<td>${additionalInfo}</td> <!-- Include additionalInfo -->
				<td>${date}</td>
			</tr>`;
		});

		return `
		<div>
			<html>
				<head>
					<!-- Add link tags for Bootstrap styles here -->
					<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
					<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/mdbootstrap@4.19.1/dist/css/mdb.min.css">
					<meta charset="UTF-8"> <!-- Add character encoding meta tag -->
				</head>
				<body>
					<div class="container">
						${suiteHeader}
						<table class="table align-middle mb-0 bg-white">
							<thead class="bg-light">
								<tr>
									<th>Suite Name</th>
									<th>Test Name</th>
									<th>Status</th>
									<th>File Name</th>
									<th>Additional Info</th> <!-- Include Additional Info -->
									<th>Date Ran</th>
								</tr>
							</thead>
							<tbody>
								${testCasesHTML.join('')}
							</tbody>
						</table>
					</div>
				</body>
			</html>
		</div>`;
	});

	return suiteResultsHTML.join('');
}

// Export the getTestResults function
module.exports = getTestResults;
