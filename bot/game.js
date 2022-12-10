import { ChatGPTAPI } from 'chatgpt'
import { default as send } from './send.cjs'
import { default as receive } from './main.cjs'

async function exec() {
    // sessionToken is required; see below for details
    const api = new ChatGPTAPI({
        sessionToken: "eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..fFfWbF4yBqo7eaCa.K7K0LQDzhSE91JDUWVprJZV48akaHcQW7lzfxffp4DJu9P23b32epZQyDDsO4n76iComSCJR8zEsqqxokvfTKQflZIOicF0ZyKhfF5nV6ErMd2Vj86HU0kX36EKJkySTGdg7EY_HeH8N2KJdbherdDOwk_zlO_59rk6T_b4a5D8cH1kL7sCauONICQsLSv0VTtP1ZniZSntSNG1hoNUF383c7tpQuWTFB0PZhvb0K7Xap8Hm88RuzURczPmGEputTDNCtGTW0D7DGs53Ty0vw9PGZtd1pH_bwhGs7wdERYrteFV66p4EM7IDJCR_-QVfsV4eWU-sMNjZGyaGbLXT008MN_TjUkQUvqNqvPsY8VqFgO-snpv0gcw2yQGCwPCJD-pdiD9SLn-rVbxamDm_mB1gIK9VHW2IHavZgWL3m2-gnfDGdeyxq8cnSgN6_nEl47rffY2Blt0c0o2EnKW3k_BQsgPB0xx5qCnEYfllFz2gBnrXR14VIq-OIR1hhXKvGdy3mOGKZdU5vC4awPQYvNaq7MYBpiO169KOsJbeYuRxhkomKqWb3AZ1oEGlaym7v27VXoUXL0OHn9DGn18dzT-7yLK55taC87xymZAky3_7rGsMR7c_Has_B-6XALxFZYbq2Tfbin-I3PwpyVGgX05ao6QWlJ4jELVGFs0FWtf863rrGwwvNu2aeFRU9Frf34Mp0wmcySwuexwjMsqmC5_srRGR6PtJ6o-sZr-TckdvtGd3pdDMtbIhroXsVImttshlIIw8fLnDS3MkVRSyzJDFeBRCyKeY_SLdoVBs5gK4l2PAi-Y0pgtMltYllJ4QxYlGiJk2KVM0JQkPtRx5jnO2sh4iVyMLtPPWlcWYL5-ua5IHO8wuEU_P8Ou4Z-psq7iUYsrGVDzaOgOfmGMZ6ce3w_OQWRTAQFKOOXY5roX3b6ia-ya8khSkWfHQKdGUcpPYcIUj4dM79tAUg70hZblY8-c6DpB4EAwiB7AHQDYWcZPv2rCDplMvos8u2cQuKR-M6DnsD0XdHm-8WAzDz2ktr-wnoMHou8627Jeyo4GDxB1YGCqEcEE9_CKon4-pFkM1vvhGoscGZxKdBW0W5HAQTToZEb3Pg5kCB3avkBDG2wT-iOgLJ0U4piiRpAAZ_4DFBEuWwZJUd8WPEtyz2uOkUPdkze7rnYegM_hY1w34t-IyErpxhAOO4tcGiW0Q6FMeg2AJUCoQD4-hyk9oTKhLXEyo9FnxlxGCtxlUcMPmaXFwZqnTCf-HR_dbwQYsozTQI9kKnKB6-sV9uo6F259INxxr51Sb7_7TLl3bPC9lfOswXiXedcu7GdTOB_ZwF2Cv3423CvG9F2w8qLZ3aPKIBYJI4t4IvfOZVNUUPowzxNxnSN0DfIZkNrwnyi98wxvhI5HsmYs6eY1XQjB-0QhSscnDcyD8shSIuyRgRHvf2dp6CWmJ2EOXmFh_7vFN47yR5TulzK8I5YeRKvKNIjZNQg0MfsB0jvDpsZdmb4U6L8S_gTlHZM2nKqnv1137H8Nu7dAC77kVsLYgEYMwRISuuTiyFz2ysNEy6FT7Ch-ttnWqXyKOPsrh1z0JPIWTnBKZzDStaeNDhGY8u5vDpzgy0pQ0tTpCimNpKAIMqkw5egKkioDR7_pyro-c3TULnN6qSPgUuCGvpzvkb3cEgjo4i8fmRfuvKuRv2UlX7GIpNSrQMwAWzSDIkfwy0hiW7WRqQsKIKBtUUK9XB6ITN693GGzYsi-lM0MSXVw5t0TrlWh8lM8Y7o2sPmpeDgidfafQBdeIVNKtM_K395D5daYynT3qqXFF2svbWNOCAcemxfHwlUEUww982fizPzIvxOiyORIgpjt7YS3b06buXxf65VA-o7crlmJP1FNedePg-okuYhFVJAjVxkRbb1BPVYG71N8nn3ZIIVFuYUee97RCn6LJJ8ZFyDR-tgyfaSbnrRisPa4IBr83aFCx7S2X-vyXaPWQ2UYh9roPOHkR6FP27lG9H9v1-kfRY_gDLbmkeGP6qUebW19Ty76gRuRKnx-V52F6xNj4ksX5yRGhnZ899Xzqy6TUwlVkrdopC3LZ4H5zJR7ySpL5-banL2-LAv7xbVO40Nxk3JGLWuzTT_2aR9her08vMLxlWQMyH0gCF3LrbxOYOFIfXtDewAdD2vINXkrpOim4LdqT5uWSCdV73aZv6ViXFXkJ_8ir7poOn0nPKi4OtWT85fMBYdCqd0-DtH03QJF4n0zidc4taNuk9JqSi-MJscdAHOxzH9KRLuyq9dPUQqNmyMnA3RW-XOaTIy5NQ0DUBZsVx61wm237miiOucB2bPa6ERGpzNLR3RucxIuumkR3-TcnERAIeFh4.PyTMiwxBvXgYKxA9M9lpaQ"
    })

    const conversation = api.getConversation()

    const init_response = await conversation.sendMessage('我非常希望你能作为群聊机器人和群友聊天。在接下来的聊天中，我会把群友的聊天记录发给你，请你生成一些回复。聊天的形式为xxx：yyy。其中xxx是说话人的姓名，yyy是他说的内容。你的名字是bot，你不能扮演其他群友，只能用bot发言。你不必对每一句话都回复，如果你不想回复，请回答暂无评论。首先请你自我介绍一下。')
    send(init_response);

    async function get_r(msg) {
        const response = await conversation.sendMessage(msg);
        // Filter
        if (response.indexOf("暂无评论") != -1) {
            console.log("filtered", response);
            return;
        }

        send(response.substring(5));
    }
    receive(get_r);
}

exec();
