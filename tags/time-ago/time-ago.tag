<rg-time-ago>
    <span show={caption}>{ caption }</span>

    <script>
        var self = this;

        var update_caption = function() {
            self.date = moment(self.opts.timestamp);
            self.caption = self.date.fromNow();
            self.update();
            window.setTimeout(update_caption, 15000);
        };

        if(self.opts.timestamp !== undefined) {
            update_caption();
        }
    </script>

</rg-time-ago>