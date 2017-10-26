<rg-video>
  
  <div class="video">
        
    <video if="{ !opts.type && !opts.controls }" width="{ opts.width }" height="{ opts.height }" src="{ opts.src }"></video>
    <video if="{  opts.type && !opts.controls }" width="{ opts.width }" height="{ opts.height }" src="{ opts.src }" type="{ opts.type }"></video>
  
  </div>

</rg-video>