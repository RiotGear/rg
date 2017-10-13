<rg-audio>
  
  <div class="audio">
    
    <audio if="{ !opts.type && !opts.controls }" src="{ opts.src }"></audio>
    <audio if="{  opts.type && !opts.controls }" src="{ opts.src }" type="{ opts.type }"></audio>
    <audio if="{  opts.type &&  opts.controls }" src="{ opts.src }" type="{ opts.type }" controls></audio>
    <audio if="{ !opts.type &&  opts.controls }" src="{ opts.src }" controls></audio>
  
  </div>

</rg-audio>