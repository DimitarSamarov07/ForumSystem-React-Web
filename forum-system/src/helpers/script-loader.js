class ScriptLoader {
    loadDatatables() {
        let script = document.createElement('script');
        script.type = `application/javascript`;
        script.text = `
            $(function () {
               $('#table').DataTable();
             });`;

        document.body.appendChild(script);

        let script2 = document.createElement("script");
        script2.type = "application/javascript";
        script.src =
            `https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.4.1/js/bootstrap.min.js`;

        document.body.appendChild(script2);
    }
}

export default ScriptLoader;