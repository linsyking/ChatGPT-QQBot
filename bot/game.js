import { ChatGPTAPI } from 'chatgpt'
import { default as send } from './send.cjs'
import { default as receive } from './main.cjs'

async function exec() {
    // sessionToken is required; see below for details
    const api = new ChatGPTAPI({
        sessionToken: "eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..Hi7gTz1XRIAeu03r.Z9bViav-2m5VFI0rD0TuhXWHHlE588ZwuJjq__Ev_SfPgRL5d9-t9PsfiDtQbRLRkULFLa-EfnumyinlcpwVBUPYXPrTABV3DZSG0SIrFbPnKp4FzZbQHKEnqB3LfLFnSc86UnyQS99dA6ewNGHfYSXqm5Y_tBFToAWaBsfjtZgucb6iC7K8HjzZImP72o68fW-sVfIc2L_4_1c09S44a8uiaP2bZcrM3hx3w_CPo1xXyAQZqO3WCxIGHqr9OOLU1WpTSwO_Re80xxFLyuUe42wb3EcFk9LDVmR4UVttq9Hl64bV-5FpvY9n9hSo3mkOYYpJ5p5147apyPsai0Mla6xVDWCPPWV6c8htkKa9ligCQ3emD4ys71Kv8_hfeRjiMDY5JPAFQus7BF4d41v2k-1vOAMqwOGzh9LfXA0DEKGR9J7NZtwSK61h7_GgasOeK7cX2U2GkqpQUuAepXXCJ4oA2IUFDQgjemA8jiG_5jMI1g6aFI3iv0EluHkZEBpKiUB-cqGxLkoas65iennQWw5jGH_sNwTBV_qq9jkCF44Mm6Au9dOyxvpe2WNQBOmA676Ew-1qKZtUfR6854AWzllu8L_nWizDTNf4RF8BguH4bpaSq9w544OqV-stX0fNH19LDvYBq5M2P-6pic02uRQR2TZr18KsGOdOS38djrhKNnee64N3xLinkQ-UT4mccjIkZDvGb2QdrpdbvrncMn93zxKzxCZzqcAg0QCECFnxoBU8coYbgTvHLaeEEtbwESUa6s0G86wYsnUYElU8vsPIu2n7IQmRqcJHguTCFppbpQWwZKgyUud3lFju3v0Q8N-p-soThIUKGBTd2ldn4YFhFIEZOxHwxeb3YdSNYRDSliGsUiH3tyMIMz7GGHDzQRJzqkht-L1p3aoN0_SmIx4U2SUMtNgKZEwxpTdKDvAupmBfvXV4ZI4CLkPEKyBOUWQHcwToqCHMoTEeFlcnHzxVCA0No07hpqMUuG1ChncXosVFM1P_WcLYULu06DvGO2sJuwu2sg3WIOiIFjBDq2fkIGMqLse7xpuqgBcvUjGN5igRS7shh1dIMO4DfeoTyKFAF3DtvWhQjrAOAjYNGnrPRQ6lJKsZhCgjq85BgfJS277on3hwS5iPwiz5al53pndbuugf_KpdSpCk-MD6vyxujc-nzAj0ddPlrXuHOZWso2Lt7tMAzZlLvj3NbtjZorvG-iGgyqSh2p-kWT-aYkwT0SrhIEgXW6JpsiI0zClbdXil6d3IBZmH_mF1-DlpD2WKZgrBqHNQnr3tiHXkx8abXIGmP2Fzi4WAKds8AylAiw48alPM-8mp-neatIm4ZUh2vdnZKwnMCXzLVeZHt_yBdlSD7mcWDnLTHtG8JGhxpJ_E0nPPxF-1VtVV_euzrFwZDnevA9enjf4VeBmeFJlzrgwBQLYg1bcOV8iGlDK_U2TToHPnDlnm5IonsB2esiOq03SfvaR230jQRRrObfm_wkTis9BUDrc1VyHVjyvvaX8bs5T8M4W1Ac-Vqw0_sT9EIHdjvd_Hw_htX6Nyes47FOUunOhaptLsLlULi6uhSaciYEjpJZ5HPKRfc5W4x2rU--GDTFOSPRsr56kw9ugktQMFrIYi3eIN1al9Nm34ILxO5Js-OCUkDKHffE82cHYeeA8jyMY1cVZZbMOSk0209WKzgP8vBp6WNoDsDAVmVgk7OOj9PX4tenqTrnr-n1xJ4vOK0YjsWQpKXM3aCS8dLVmctpsnk2fSyT9G7r8Muc75EHm4DD0f8v3_OH-jDLtJqyOUJ5AnHdaVpLPfb017QNpYbxY-kIn0FK8GMx7M00mTYv0UzVMyUYdGhuUqC_onum-L6Scisuhq3FIVswUVdKUm34bQ8g4F83XOq3geR5CesKRyG1A4kD9xrt0xo3pmGBmtGOPuxAlC_TLQxvcNL0XYUvm1SMpBqizSDelXCAeFqBVnu6jt-kBmoKGbf4amBNI1oA8Gr98EYwmO_8hgnueOnHc_HYYnFM5iL-v6NJVFjtnUbPVaUr2ImHWr0NqDqkiccnvYybmB4rrYv73ULMIWufM2lnhoWTMX18XFTE7GnGeTaKhG4q-DFf7AJuaK9hdOhgKRpDZE45jYlKpnVxRZGnZvzFnBxP16RUbB_MnOkHhR6NopoDa5ky56Gn-7VKsfz-j_nUfaUXqvPHlruQYUQ-1oql4BoLO96Vj7oi3IqUmW2D5PPVQO2wKNEDno-LWO8G--rov9FVKFwreJaV0PSNfmRxGSazuhVDGQ3lUlh0Hqgd_LiXKw3QpQWMBNpUh1PQk5xMSBhsO2lgjThlfa1aZ59-gEt0AO5wt-T8Ih5KI3hIy4y9x_5BWMoan5.ZfhHWyHE7DyLvCDiidOlmg"
    })

    const conversation = api.getConversation();

    const init_response = await conversation.sendMessage('我非常希望你能作为群聊机器人和群友聊天。在接下来的聊天中，我会把群友的聊天记录发给你，请你生成一些回复。聊天的形式为xxx：yyy。其中xxx是说话人的姓名，yyy是他说的内容。你的名字是King，你不能扮演其他群友，只能用King发言。你不必对每一句话都回复，如果你不想回复，请回答暂无评论。首先请你用英语自我介绍一下。')
    send(init_response);

    async function get_r(msg) {
        const response = await conversation.sendMessage(msg);
        // Filter
        if (response.indexOf("暂无评论") != -1) {
            console.log("filtered", response);
            return;
        }

        send(response);
    }
    receive(get_r);
}

exec();
