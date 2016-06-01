<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template match="/">
		<p><strong><xsl:value-of select="//title"/></strong></p>
		<p><xsl:value-of select="//author"/></p>
	</xsl:template>
</xsl:stylesheet>