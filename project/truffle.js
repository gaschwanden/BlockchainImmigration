module.exports = {
    // See <http://truffleframework.com/docs/advanced/configuration>
    // to customize your Truffle configuration!
    license: "MIT",
    package_name: "comp90019",
    version: "0.0.1",
    description: "Simple contract to add two numbers",
    authors: [
        "Dheeraj Agrawal <agrawald@student.unimelb.edu.au>"
    ],
    keywords: [
        "ethereum",
        "addition"
    ],
    dependencies: {},
    networks: {
        development: {
            host: "127.0.0.1",
            port: 8545,
            network_id: "*" // Match any network id
        }
    },
    solc: {
        optimizer: {
            enabled: true,
            runs: 200
        }
    }
};
