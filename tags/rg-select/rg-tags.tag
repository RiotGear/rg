<rg-tags>

	<div class="container">
		<span class="tags">
			<span class="tag" each="{ tag in RgTags.tags }" onclick="{ parent.removeTag }">
				{ tag.text }
				<span class="close">&times;</span>
			</span>
		</span>

		<div class="field-container { isvisible: RgTags.isvisible }">
			<input type="text"
						 class="field"
						 name="filterfield"
						 placeholder="{ RgTags.placeholder }"
						 onkeydown="{ handleKeys }"
						 oninput="{ filter }"
						 onfocus="{ toggle }">

			<div class="dropdown { isvisible: RgTags.isvisible }">
				<ul class="list">
					<li each="{ RgTags.filtereditems }"
							onclick="{ parent.addTag }"
							class="item { disabled: disabled, active: active }">
						{ text }
					</li>
				</ul>
			</div>
		</div>
	</div>

	<script>
		/* istanbul ignore next */
		const handleClickOutside = e => {
			if (!this.root.contains(e.target)) {
				this.RgTags.close()
				this.update()
			}
		}

		this.handleKeys = e => {
			if ([13, 38, 40].indexOf(e.keyCode) > -1 && !this.RgTags.isvisible) {
				e.preventDefault()
				this.toggle()
				return true
			}
			if (!this.RgTags.isvisible) this.toggle()
			var length = this.RgTags.filtereditems.length
			if (length > 0 && [13, 38, 40].indexOf(e.keyCode) > -1) {
				e.preventDefault()
					// Get the currently selected item
				var activeIndex = null
				for (let i = 0; i < length; i++) {
					let item = this.RgTags.filtereditems[i]
					if (item.active) {
						activeIndex = i
						break
					}
				}

				// We're leaving this item
				if (activeIndex != null) this.RgTags.filtereditems[activeIndex].active = false

				if (e.keyCode == 38) {
					// Move the active state to the next item lower down the index
					if (activeIndex == null || activeIndex == 0)
						this.RgTags.filtereditems[length - 1].active = true
					else
						this.RgTags.filtereditems[activeIndex - 1].active = true
				} else if (e.keyCode == 40) {
					// Move the active state to the next item higher up the index
					if (activeIndex == null || activeIndex == length - 1)
						this.RgTags.filtereditems[0].active = true
					else
						this.RgTags.filtereditems[activeIndex + 1].active = true
				} else if (e.keyCode == 13 && activeIndex != null) {
					this.addTag({
						item: this.RgTags.filtereditems[activeIndex]
					})
				}
			}
			if (e.keyCode == 13) {
				this.addTag()
			} else if (e.keyCode == 8 && this.filterfield.value == '' && this.RgTags.tags.length > 0) {
				let tag = this.RgTags.tags.pop()
				this.filterfield.value = tag.text
			}
			return true
		};

		this.toggle = () => {
			this.filter()
			this.RgTags.toggle()
		}

		this.filter = () => {
			this.RgTags.filter(this.filterfield.value)
		}

		this.addTag = e => {
			let tag = {
				text: this.filterfield.value
			}
			if (e) tag = e.item
			if (tag.text.length > 0) this.RgTags.addTag(tag)
			this.filterfield.value = ''
		}

		this.removeTag = e => {
			this.RgTags.removeTag(e.item)
		}

		this.on('mount', () => {
			this.RgTags = opts.tags || new RgTags(opts)
			this.RgTags.on('update', () => {
				if (this.RgTags.isvisible) this.filter()
				this.update()
			})
			document.addEventListener('click', handleClickOutside)
			document.addEventListener('focus', handleClickOutside, true)
			this.filterfield.value = this.RgTags.value
			this.update()
		})

		this.on('unmount', () => {
			document.removeEventListener('click', handleClickOutside)
			document.removeEventListener('focus', handleClickOutside, true)
		})

		this.on('update', () => {
			if (this.isMounted) {
				const container = this.root.querySelector('.container')
				let containerWidth = container.getBoundingClientRect().width
				let tagList = this.root.querySelector('.tags')
				let tagListWidth = tagList.getBoundingClientRect().width
				tagList.scrollLeft = Number.MAX_VALUE

				let fieldContainer = this.root.querySelector('.field-container')
				fieldContainer.style.width = `${(containerWidth - tagListWidth)}px`
				this.root.querySelector('.container').style.height = `${fieldContainer.getBoundingClientRect().height}px`
			}
		})

	</script>

	<style scoped>
		.container {
			position: relative;
			width: 100%;
			border: 1px solid #D3D3D3;
			background-color: white;
			text-align: left;
			padding: 0;
			box-sizing: border-box;
		}

		.field-container {
			position: absolute;
			display: inline-block;
			cursor: pointer;
		}

		.field {
			width: 100%;
			padding: 10px;
			border: 0;
			box-sizing: border-box;
			background-color: transparent;
			white-space: nowrap;
			font-size: 1em;
			line-height: normal;
			outline: 0;
			-webkit-appearance: none;
			-moz-appearance: none;
			appearance: none;
		}

		.dropdown {
			display: none;
			position: absolute;
			width: 100%;
			background-color: white;
			border-bottom: 1px solid #D3D3D3;
			box-sizing: border-box;
			overflow-y: auto;
			overflow-x: hidden;
			max-height: 280px;
			margin: -1px 0 0 -1px;
		}

		.dropdown.isvisible {
			display: block;
		}

		.list, .item {
			list-style: none;
			padding: 0;
			margin: 0;
		}

		.list.empty {
			display: none;
		}

		.item {
			padding: 10px;
			border-left: 1px solid #D3D3D3;
			border-right: 1px solid #D3D3D3;
			border-top: 1px solid #E8E8E8;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}

		.item:first-child {
			border-top: 0;
		}

		.item:hover {
			background-color: #f3f3f3;
		}

		.item.active,
		.item:hover.active {
			background-color: #ededed;
		}

		.tags {
			display: inline-block;
			max-width: 70%;
			white-space: nowrap;
			overflow-y: hidden;
			overflow-x: auto;
			-webkit-user-select: none;
			-moz-user-select: none;
			-ms-user-select: none;
			user-select: none;
		}

		.tag {
			position: relative;
			display: inline-block;
			padding: 8px 20px 8px 5px;
			margin: 1px;
			background-color: #000;
			color: #fff;
			font-size: 1em;
			line-height: normal;
			cursor: pointer;
		}

		.tag:hover, .tag:active {
			background-color: #666;
		}

		.close {
			position: absolute;
			right: 5px;
			top: 7px;
			color: rgba(255, 255, 255, 0.7);
		}

	</style>
</rg-tags>
