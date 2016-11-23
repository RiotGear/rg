<rg-time-relative>
    <span show={ caption }>{ caption }</span>

    <script>
        var self = this;

        self.opts.refreshRate = self.opts.refreshRate || 15000;

        var update_caption = function() {
            self.date = moment(self.opts.timestamp);
            self.caption = self.date.fromNow();

            if(self.caption == "Invalid date") {
                // If we did get an invalid date let's not let the user know...
                self.caption = "";
            }

            self.update();
            window.setTimeout(update_caption, self.opts.refreshRate);
        };

        if(self.opts.timestamp !== undefined) {
            update_caption();
        }
    </script>

</rg-time-relative>