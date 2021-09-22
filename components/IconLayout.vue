<template>
  <div class="cardLayout" :class="stype">
    <div class="wishlist">
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path
          d="M20.8,5.7c-2.1-2.8-6-3.4-8.8-1.3C9.5,2.5,6,2.8,3.8,5c-2.4,2.4-2.5,6.4,0,8.9l6.2,6.2c0.5,0.5,1.2,0.8,1.9,0.8c0.7,0,1.4-0.3,1.9-0.8l6.2-6.2C22.4,11.6,22.6,8.2,20.8,5.7z"
        ></path>
      </svg>
    </div>
    <video v-if="stype==='lotties'"
      :src="src"
      :alt="text"
      preload
      autoplay
      @mouseenter="$event.target.readyState > 1 && ($event.target.currentTime = 0,$event.target.loop = true, $event.target.play())"
      @mouseout="$event.target.readyState > 1 && $event.target.pause()"
    />
    <img v-else
      :src="src || 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAJ10lEQVR4nM2bTWzbyBXHKcvydyRZ/pC/0ksStJf2vtu959JDUcALGbQFx1K4EkORwxkqgnXpLArLMCwkgKAYEKBAQBAhWzaA4bgg1icdmupQ8JJdCDnooENuC2zTw97WyfRgTkAz+qAkMjGBAQSJ0nv/n2bezLzhY5g2FyHEY27t7hnkIoR4CSGjRvOY3h8xNSft2dNhudHs5IhTzhh2RnRdn3r16tW0rutThJCRRqMxpuv6lK7rU41GY8xJe4bNUUKIz2gjhsbLoE3CfY1GY6zRaIwRQkaddsaw5dU0za+qakBV1YCmaX5N0/z1en3SDXsMwzDNZnO81WpNUF2G1o8AjDYajTF6o1vOMAzDqKrqLZfLoXK5HKpWq7NPnjyZdtMeIcRTr9cnzRCsN3ip+LOzs+larTajqqrXLYcODg6uFQqFhUKhsJDP5+eLxeJcrVZzpccxDMOoqjqmaZr/7Oxs2gThYngb/76v1WpN1Gq1CU3T/MfHx8FKpRJ0wymMsX9vby+8t7cXvn///l8ymczXGOPFXC63gDF23F6hUBivVquzx8fHwbOzs+l6vT755s2bSSMmeBhCiIeOe4a5oFWtVmeLxeJcPp+fd9KpTCYTSKfTSwCAZQjhXyGE5xDCc4TQ37LZ7LKiKIulUsnnlD2M8UQul1soFotzT58+9dNA32q1JprN5jghxEunoEsiC4XCeC6XW9jb2wtns9mwE04BAIKCIKzwPH8TQngMISTmJsvyC1mWb/I8v8Rx3ND2MMZT6XR6KZvNhvf392ct067nQyzoND9ijCfS6fSSIAgrHMctD+NUMpmcjUajq4Ig/FGW5YZVvAnCa57nv9zZ2VkZxh7HcVM7OzsrgiCs7O7uznXSSAjpHucwxlOJRGKVZdm1QZ2KxWIhlmXXeJ5nAQBvO4mnDQDwVhCEzWg0ujqIva2trWmWZddYll1LJBKLGOPh1jIcx02xLLsWiUSu9+tULBYLRaPR3wiCkAMAnPcSb/QCAgB4J4riPsuya/3Y29ramo5EItcjkcj1jY2N8NDi2/2wXQixWCy0s7PzW1EUTwEAPYVbIUiSRFKp1D+3t7dv2bFn9nF7e3vJMfHtDPSCEIvFQhzHfSWK4ut+xVshiKL4+u7du192s+e6+H4gxGKxUDKZ3AQAvB1UvBUCAOB/PM+z7ex9MvF2IESj0TlBEHKSJJ0PK74NhHeCIOQwxmPtfPkk4rtBuHPnznVRFE8NZx0Rb4VgtFMAQPCziW8HgY53N8S3gyCK4muO4776bOLNEOh4d1N8OwhGXNj4bOIJIR5Jkr6VJOnc1D2JLMufBACNCwihrJNZJFuXoijTAIBjkyPEbQhW8eYGIXyOMZ75JOLT6fQNWZYbZvHtHHQSgvW3O7z3YzqdvuGqeITQbTre2435PiD8BCF8iBDaMtoD4z1b4rt89l+E0G3HhRNCPIqiZAAA553E24WAEPoOY+y32sAY+xFC39kV38XeuaIoGcfigqIo0wihv5vHea9o3wkCQuj7bqk2VVW9CKHv7YrvYU9VFGW4XGM6nb4BIfyhH/Fd/r136XT6lg2bt2RZfm9XfA8IPwwcFxBCtyGEP1vm3mGC1492d3WSJP3Yj/geQ+bnvuNCJpP5PULoGYTwWJKkU2P5+Z8hI7jWaxdJV5eSJGn9ijfbE0VRp35DCJ8jhJ4pivKHtkY7nf5kMpmAIAgr8Xh8LRaLhSCE64M4ZHLq3912kealtSRJ/xrUlmEvEolEVuLx+BrP80vtcpr0MIghhHhbrdaEOWpijP00H5hMJmcZhmGGAWC0X7a3t3/XDoJlX3EDIfTLkLbWOY7z0bxgNpsNm7PbhBBvvV6fpElRr67rU6qqzhBCPAcHB9cwxotG+jpIv+QAACLL8p51F2nd1SGEvh3WDoRwnWEYhuM4H8/zS+l0eimXyy3UarVRVVW9mqb5jbPJ0Q8Hlpqm+SuVStA4C1jMZDIBc5dxAgBC6FdJkqJmCGbxsixHEEK/OgWAYRimVCr5jB6wWCwW5yqVSlBV1YAB4KLXN5vNcVVVA0dHR7MGgI8WKk4AMNp7WZafJZPJP29ubt7c3Ny8ee/evT8hhJ5CCN87ZGPd7HupVPLlcrmFfD4/f3R0NKtpmv9S7Gs0GmMWACHrNtNBAG03Ng5voOwDoENAVdVAqVQK0CGAEJo3Q3AKQLddnYMQLg0BRVEWrUPACIIeM4BJhrk4uaVBMJVKLVAITgCws6tzCELXIHhycnLNiAFeCuDSPGmeBunpyrAA+tnVOQDB7jTo7Xg2aF4IbWxshBVF+doN8W5A6Gsh1O0CAATj8fgay7JrqVTqrlvinYQgyzJJpVLfDHOeeelKJpOzLMuuCYKQcGhz4hoE+l1BEBKRSGR48fSKxWIhCmBQIcOAswPB/J1UKvWNY+LpJYrinUG7shNDpxuENvdGHBXPMBfToDX765b4fiB0uGe9t6IBAEAIP0qBuyXeDoQun7kHoBMEN8R3E9qjd7gLoB0Et8R3gtBjaLgPoBOETgIQQnXjN3o2415bEDoEx08DoJ1DXf5FtQ9b6pUH0OOsznEAV2oItAt4NqbIgQFcqSDYLdr3gDAQgCs1DdqZ6rpA6BvAVVsIbdqd6jpA6AvAlVoKb21tTfe7GbJCQAj9ow8Az+2KbwfB0c0QfVRWEIREv2eDlkPVF3ae5+E4ziddHGvZFm+FIAhCwpFcgCzLk0ZabFUUxXg/4s1OGSBO4/F41+d3aRpLujiL7NsWtSeKYiKRSKx2ygZduro9Lp/NZsMAgOVUKrUwbEpMluXTRCKxak60WsVzHLecSCRWZVl+Magto20KgrACAFjGGC92KvqgWWGvtWBC07Rxmh7f3d2dcyIpCiE8BgAsAwCWrSn3UqnkkyQpDABY5nl+CUL4fEhb67IsT5pPhMwPZtAyIULICEMIGWk2m+PWkplyuRx6+PBhkPYQBwComUwmkM1mw9lsNkwLGTDGozQNjzFeLJVKPthhKdwPANqL8/n8fLlcDhllel5CiMcolxmjAC4VTb18+fKaqqoBWmNDqSmK8oXh2EANISQbTvkPDw8XDw8PF/f392cxxvNGN/1Qn4QQkoexpSjKF9RvWjSlqmqgVqvN1Gq1CeM03PdBH63gbLVaE7quT52dnU27+fDho0ePZorF4hxtDx48CLlZNqfruq9Wq83ouj71kXiG+TyFk5VKJVipVILVanX28ePH19x+2rNN9Wjb0tnRRqMx1mw2x62nRU5dhBDvycnJNVoyS0to6fMJbtjUdf1SSXCn0lmP8XrEVGzsaPUoLWGlZaw0ANPi6VqtNuE0BEMsbQNVkzv2NDbpUCZvctDRinU7Yv8PwWw3M6AYlYwAAAAASUVORK5CYII='"
      :alt="text"
    />
    <p>{{ text }}</p>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['src', 'text','stype'],
}
</script>


<style>
.wishlist {
  position: absolute;
  top: 5px;
  border: inherit;
  border-radius: inherit;
  right: 5px;
  display: none;
  background-color: #fff;
}
.wishlist > svg {
  width: 32px;
  height: 32px;
  padding: 5px;
  color: #6a6a6a;
}
.wishlist:hover {
  background: #e1e1e1;
}
.cardLayout:hover > .wishlist {
  display: block;
}
.cardLayout {
  cursor: pointer;
  position: relative;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid transparent;
  border-radius: 5px;
}
.cardLayout:not(.lotties):hover {
  border-color: #cecece;
  background-color: #efeff0;
}
.cardLayout.lotties:hover {
  border-color: #cecece;
  box-shadow: 0 2px 4px #cbcaff;
}
.cardLayout p {
	position: absolute;
	bottom: 10px;
	margin: 0;
	display: none;
  font-size: 0.75rem;
	background-color: #6563ff;
	padding: 5px 10px;
  border-radius: 5px;
  color: white;
  box-shadow: 0 3px 4px hsla(0, 0%, 0%, 0.3);
}
.cardLayout p:hover {
  opacity: 0.86;
}
.cardLayout:hover p{
  display: block;
}
.cardLayout video,
.cardLayout img{
  width:80%;
  object-fit: scale-down;
  height: 180px;
  border-radius: 5px;
}

</style>