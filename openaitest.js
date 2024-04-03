const OpenAI = require("openai");
const fs = require('fs');


const openai = new OpenAI();

async function main(location, description, status, primcontact, primcontactemail, primcontactphone ) {
    const completion = await openai.chat.completions.create({
        messages: [{ "role": "system", "content": "your job is to craft an email to a potential investor in Loupt Crowdfunding. Loupt CrowdFunding is looking to disrupt the equity crowdfunding space by combining an investment platform with social media feeatures, such as a linkedin-style feed and connections. Users are able to see and copy investments made by \'connected\' users- a connection is formed when two users follow each other. Users may also choose to expose their investments and other personal information to 2nd degree connecitons- that is, connections of their connections. make the emails about 150 words long. Make the wording of the email itself sound trustworthy and transparent (and somewhat emotionless)- not like jordan belford. DO not use big swings and hooks. Do not use long words- keep everything easy to read and very understandable. We have a very promising platform, and the space is ready for disruption. Make the closing be from Tim Lunger. Make it sound genuine and relate the platofrm to the interests of the investor specified in the prompt. Strive to make the email upbeat and not like a typical pitch email- say something along the lines of 'i noticed you were looking for investment oppurtunities in x' where applicable. Make the email sound not robotic, and definitely do not leave any whitespace fill-in-the-blanks for us to fill in after- what you generate is directly what will end up being sent. Also mention that we are nearing the deadline for the finra approval process- we had a two-hour interview just last week, featuring a flawless demo of our platform. We plan to launch very soon as we complete the regulatory approval process. We are based out of the Lehigh Valley currently, so the greater new york area. Do not use crowdfunding twice in the same sentence, especially in the subject. Do not mention where thye are from if it's not near new york city- as that's where we are from. However, we have partners from Boston, Wilmington, and Houston. Also mention that we are talking to several promising startups to list on the platform, and are working to establish bank partnerships and create innovative new ways to invest. Keep the newlines to a minimum- one or two at most. Directly use the name of the primary contact in the greeting. Use only the first name in the greeting." },
        { "role": "user", "content": `investor location: ${location}, description of investment (infer name of vc from here, if applicable): ${description} status: ${status}, name of primary contact (address email to them instead of to the investment firm): ${primcontact}, email address: ${primcontactemail}, phone number (not neccesarily needed): ${primcontactphone}` }],
        model: "gpt-4",
    });

    console.log(completion.choices[0].message.content);
    console.log('-----------------------------------')
}
//iterate over rows of a csv file specified
//for each row, generate an email using the specified fields
//save the email to a new csv file

async function generateEmails() {
    const file = fs.readFileSync(__dirname + '/outputs/out.csv').toString();
    let rows = file.split('\n');
    for (let i = 0; i < rows.length; i++) {
        let row = rows[i].split(',');
        let location = row[0];
        let description = row[1];
        let status = row[2];
        let primcontact = row[3];
        let primcontactemail = row[4];
        let primcontactphone = row[5];
        await main(location, description, status, primcontact, primcontactemail, primcontactphone);
    }
}

generateEmails();
//main();