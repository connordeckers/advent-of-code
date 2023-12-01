# vim:ft=make

test DAY:
	@mask --maskfile README.md {{DAY}} test

run DAY:
	@mask --maskfile README.md {{DAY}} solution
