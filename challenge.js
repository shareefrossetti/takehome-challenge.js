const fs = require('fs');

// Load and parse the user data
const usersData = JSON.parse(fs.readFileSync('user.json', 'utf8'));

// Load and parse the companies data
const companiesData = JSON.parse(fs.readFileSync('companies.json', 'utf8'));

// Function to find a company by its ID
function findCompanyById(companyId) {
    return companiesData.find((company) => company.id === companyId);
}

// Function to update user data with top-ups
function updateUserTokens(user, topUpAmount) {
    user.tokens += topUpAmount;
}

// Sort users alphabetically by last name
usersData.sort((a, b) => a.last_name.localeCompare(b.last_name));

// Sort companies by ID
companiesData.sort((a, b) => a.id - b.id);

// Process the data and generate the output
let output = '';

companiesData.forEach((company) => {
    output += `\nCompany Id: ${company.id}\nCompany Name: ${company.name}\nUsers Emailed:\n`;

    usersData.forEach((user) => {
        if (user.active_status && user.company_id === company.id) {
            const companyData = findCompanyById(user.company_id);
            const emailStatus = companyData.email_status && user.email_status;

            if (emailStatus) {
                output += `  ${user.last_name}, ${user.first_name}, ${user.email}\n`;
                output += `    Previous Token Balance: ${user.tokens}\n`;
                updateUserTokens(user, companyData.top_up);
                output += `    New Token Balance: ${user.tokens}\n`;
            }
        }
    });

    output += 'Users Not Emailed:\n';

    usersData.forEach((user) => {
        if (user.active_status && user.company_id === company.id) {
            const companyData = findCompanyById(user.company_id);
            const emailStatus = companyData.email_status && user.email_status;

            if (!emailStatus) {
                output += `  ${user.last_name}, ${user.first_name}, ${user.email}\n`;
                output += `    Previous Token Balance: ${user.tokens}\n`;
                updateUserTokens(user, companyData.top_up);
                output += `    New Token Balance: ${user.tokens}\n`;
            }
        }
    });

    const totalTopUps = usersData.reduce((acc, user) => {
        if (user.company_id === company.id && user.active_status) {
            const companyData = findCompanyById(user.company_id);
            acc += companyData.top_up;
        }
        return acc;
    }, 0);

    output += `Total amount of top ups for ${company.name}: ${totalTopUps}\n`;
});

// Write the output to a file
fs.writeFileSync('output.txt', output);

console.log('Output file created successfully!');
